require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Book = require('./models/Book');
const redis = require('./redisClient');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// اتصال به MongoDB
mongoose.connect('mongodb://localhost:27017/libraryDB')
// .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- ROUTES ---

// 1. دریافت لیست کتاب‌ها (Client & Admin)
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. افزودن کتاب جدید (Admin)
app.post('/api/books', async (req, res) => {
  const { title, author, count } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      totalCopies: count,
      availableCopies: count
    });
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. رزرو کتاب با رعایت Concurrency (نکته کلیدی پروژه)
app.post('/api/reserve/:id', async (req, res) => {
  const bookId = req.params.id;
  const lockKey = `lock:book:${bookId}`;

  try {
    // گام 1: تلاش برای دریافت قفل (Lock) از Redis
    // SET NX: یعنی فقط اگر کلید وجود نداشت ست کن (Not Exists)
    // EX 5: قفل بعد از 5 ثانیه خودکار باز می‌شود (برای جلوگیری از Deadlock)
    const acquiredLock = await redis.set(lockKey, 'locked', 'NX', 'EX', 5);

    if (!acquiredLock) {
      // اگر قفل دریافت نشد، یعنی شخص دیگری دقیقا در همین لحظه در حال رزرو است
      return res.status(429).json({ message: 'سیستم شلوغ است، لطفا مجدد تلاش کنید.' });
    }

    // --- شروع ناحیه بحرانی (Critical Section) ---
    
    // گام 2: خواندن وضعیت کتاب از دیتابیس
    const book = await Book.findById(bookId);

    if (!book) {
      await redis.del(lockKey); // آزادسازی قفل
      return res.status(404).json({ message: 'کتاب یافت نشد' });
    }

    if (book.availableCopies <= 0) {
      await redis.del(lockKey); // آزادسازی قفل
      return res.status(400).json({ message: 'موجودی کتاب تمام شده است' });
    }

    // گام 3: کاهش موجودی (رزرو)
    book.availableCopies -= 1;
    await book.save();

    // --- پایان ناحیه بحرانی ---

    // گام 4: آزادسازی قفل
    await redis.del(lockKey);

    res.json({ message: 'کتاب با موفقیت رزرو شد', book });

  } catch (err) {
    // در صورت بروز خطا هم باید قفل را باز کنیم
    await redis.del(lockKey);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
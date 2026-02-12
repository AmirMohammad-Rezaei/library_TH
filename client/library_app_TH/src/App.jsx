import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Plus, AlertCircle, CheckCircle, Library } from 'lucide-react';
import MyHeader from './components/myHeader';
import AdminPanel from './components/AdminPanel';
import BookCardItem from './components/BookCardItem';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', count: 1 });
  const [message, setMessage] = useState(null); // null, { text: '', type: 'success' | 'error' }

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/books`, newBook);
      setMessage({ text: 'کتاب با موفقیت اضافه شد', type: 'success' });
      setNewBook({ title: '', author: '', count: 1 });
      fetchBooks();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ text: 'خطا در افزودن کتاب', type: 'error' });
    }
  };

  const handleReserve = async (id) => {
    setMessage({ text: 'در حال پردازش درخواست...', type: 'info' });
    try {
      const res = await axios.post(`${API_URL}/reserve/${id}`);
      setMessage({ text: res.data.message, type: 'success' });
      fetchBooks();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'خطا در رزرو';
      setMessage({ text: errorMsg, type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* --- Header --- */}
        <MyHeader />

        {/* --- Notification Alert --- */}
        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-lg shadow-sm animate-pulse max-w-2xl mx-auto
            ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
              message.type === 'error' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* --- Admin Panel --- */}
        <AdminPanel newBook={newBook} setNewBook={setNewBook} handleAddBook={handleAddBook} />

        {/* --- Client Panel (Books Grid) --- */}
        <BookCardItem books={books} handleReserve={handleReserve} />
      </div>
    </div>
  );
}

export default App;
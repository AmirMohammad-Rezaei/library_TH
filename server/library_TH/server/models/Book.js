const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true }, // تعدادی که الان موجود است
});

module.exports = mongoose.model("Book", BookSchema)
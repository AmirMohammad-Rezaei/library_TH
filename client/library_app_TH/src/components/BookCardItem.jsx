import { BookOpen } from "lucide-react";

function BookCardItem({ books, handleReserve }) {
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <BookOpen size={24} className="text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800">قفسه کتاب‌ها</h2>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-400">هنوز کتابی اضافه نشده است.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map(book => {
                        const isSoldOut = book.availableCopies === 0;
                        return (
                            <div key={book._id} className="group bg-white rounded-xl shadow-md hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col">
                                <div className="p-6 flex-1">
                                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4">اثر {book.author}</p>

                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <span className="text-sm text-slate-600">موجودی فعلی:</span>
                                        <span className={`font-mono font-bold text-lg ${isSoldOut ? 'text-rose-500' : 'text-emerald-600'}`}>
                                            {book.availableCopies} <span className="text-xs text-slate-400 font-normal">/ {book.totalCopies}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100">
                                    <button
                                        onClick={() => handleReserve(book._id)}
                                        disabled={isSoldOut}
                                        className={`w-full py-2.5 rounded-lg font-bold shadow-sm transition-all duration-200 flex justify-center items-center gap-2
                          ${isSoldOut
                                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95'
                                            }`}
                                    >
                                        {isSoldOut ? 'ناموجود' : 'رزرو کتاب'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    )
}

export default BookCardItem
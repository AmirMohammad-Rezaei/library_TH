import { Plus } from "lucide-react"

function AdminPanel({ newBook, setNewBook , handleAddBook }) {
    return (
        <section className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-800 p-4 text-white flex items-center gap-2">
                <Plus size={20} />
                <h2 className="font-bold text-lg">پنل ادمین: افزودن کتاب</h2>
            </div>
            <div className="p-6 md:p-8">
                <form onSubmit={handleAddBook} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-sm font-medium text-slate-600">عنوان کتاب</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="مثلاً: جنایت و مکافات"
                            value={newBook.title}
                            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-sm font-medium text-slate-600">نویسنده</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="مثلاً: داستایوفسکی"
                            value={newBook.author}
                            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                            required
                        />
                    </div>
                    <div className="w-full md:w-32 space-y-1">
                        <label className="text-sm font-medium text-slate-600">تعداد</label>
                        <input
                            type="number"
                            min="1"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-center"
                            value={newBook.count}
                            onChange={e => setNewBook({ ...newBook, count: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> افزودن
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AdminPanel
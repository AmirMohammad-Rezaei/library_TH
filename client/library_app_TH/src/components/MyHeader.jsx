import { Library } from "lucide-react"

function MyHeader() {
    return (
        <header className="text-center space-y-2">
            <div className="flex justify-center items-center gap-3 text-indigo-600">
                <Library size={48} />
                <h1 className="text-4xl font-extrabold tracking-tight">کتابخانه هوشمند</h1>
            </div>
            <p className="text-slate-500 text-lg">سیستم مدیریت توزیع‌شده با Node.js و Redis</p>
        </header>
    )
}
export default MyHeader
import Card from "../components/Card";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">📊 Дашборд</h1>
                <p className="text-slate-500 mt-1">Общая статистика сервиса</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Пользователей" value={124} accent="bg-blue-500" />
                <Card title="Товаров" value={56} accent="bg-emerald-500" />
                <Card title="Заказов" value={342} accent="bg-amber-500" />
                <Card title="Выручка" value="1 248 500 ₽" accent="bg-purple-500" />
            </div>
        </div>
    );
}
import DataTable, { type Column } from "../components/DataTable";
import type { Product } from "../types";

const mockProducts: Product[] = [
    { id: 1, title: "Ноутбук Lenovo IdeaPad", price: 54990, inStock: true },
    { id: 2, title: "Мышь Logitech MX Master 3", price: 8990, inStock: true },
    { id: 3, title: "Клавиатура Keychron K2", price: 12490, inStock: false },
    { id: 4, title: "Монитор Dell UltraSharp 27", price: 38990, inStock: true },
    { id: 5, title: "Веб-камера Logitech C920", price: 7490, inStock: false },
];

const columns: Column<Product>[] = [
    { id: "id", key: "id", label: "ID" },
    { id: "title", key: "title", label: "Название" },
    {
        id: "price",
        key: "price",
        label: "Цена",
        render: (row) => <span className="font-bold">{row.price} ₽</span>,
    },
    {
        id: "inStock",
        key: "inStock",
        label: "Наличие",
        render: (row) => (row.inStock ? "✅ В наличии" : "❌ Нет"),
    },
];

export default function Products() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">📦 Товары</h1>
                <p className="text-slate-500 mt-1">Всего: {mockProducts.length}</p>
            </div>
            <DataTable columns={columns} data={mockProducts} />
        </div>
    );
}
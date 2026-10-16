import { useState } from "react";
import type { Product } from "../types";

interface Props {
    initial?: Partial<Product>;
    onSubmit: (data: Omit<Product, "id">) => void;
    onCancel: () => void;
}

export default function ProductForm({ initial = {}, onSubmit, onCancel }: Props) {
    const [title, setTitle] = useState(initial.title ?? "");
    const [price, setPrice] = useState(initial.price?.toString() ?? "");
    const [inStock, setInStock] = useState(initial.inStock ?? true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            price: Number(price) || 0,
            inStock,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 max-w-xl"
        >
            <h2 className="text-xl font-bold text-slate-800">
                {initial.id ? "✏️ Редактирование товара" : "➕ Новый товар"}
            </h2>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Название</span>
                <input
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ноутбук Lenovo IdeaPad"
                    required
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Цена, ₽</span>
                <input
                    type="number"
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="54990"
                    required
                    min={0}
                />
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">В наличии</span>
            </label>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded hover:bg-slate-300 transition-colors"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}
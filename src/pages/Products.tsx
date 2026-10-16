import { useEffect, useState } from "react";
import DataTable, { type Column } from "../components/DataTable";
import ProductForm from "../components/ProductForm";
import { productsApi } from "../api/products";
import { useFetch } from "../hooks/useFetch";
import type { Product } from "../types";

export default function Products() {
    const { data, loading, error } = useFetch<Product[]>(() => productsApi.list(), []);

    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    useEffect(() => {
        if (data) setProducts(data);
    }, [data]);

    const handleCreate = async (formData: Omit<Product, "id">) => {
        const optimistic: Product = { ...formData, id: Date.now() };
        setProducts((prev) => [optimistic, ...prev]);
        setShowForm(false);
        try {
            await productsApi.create(formData);
        } catch {
            alert("Ошибка создания");
        }
    };

    const handleUpdate = async (formData: Omit<Product, "id">) => {
        if (!editing) return;
        const id = editing.id;
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...formData } : p)));
        setEditing(null);
        setShowForm(false);
        try {
            await productsApi.update(id, formData);
        } catch {
            alert("Ошибка обновления");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить товар?")) return;
        setProducts((prev) => prev.filter((p) => p.id !== id));
        try {
            await productsApi.remove(id);
        } catch {
            alert("Ошибка удаления");
        }
    };

    const columns: Column<Product>[] = [
        { id: "id", key: "id", label: "ID" },
        { id: "title", key: "title", label: "Название" },
        {
            id: "price",
            key: "price",
            label: "Цена",
            render: (row) => <span className="font-bold">{row.price.toLocaleString("ru-RU")} ₽</span>,
        },
        {
            id: "inStock",
            key: "inStock",
            label: "Наличие",
            render: (row) => (row.inStock ? "✅ В наличии" : "❌ Нет"),
        },
        {
            id: "actions",
            key: "id",
            label: "Действия",
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setEditing(row);
                            setShowForm(true);
                        }}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Изменить
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:underline text-sm">
                        Удалить
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">📦 Товары</h1>
                    <p className="text-slate-500 mt-1">
                        {loading ? "Загрузка..." : `Всего: ${products.length}`}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    + Добавить
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                    ❌ Ошибка: {error}
                </div>
            )}

            {showForm && (
                <ProductForm
                    initial={editing ?? {}}
                    onSubmit={editing ? handleUpdate : handleCreate}
                    onCancel={() => {
                        setShowForm(false);
                        setEditing(null);
                    }}
                />
            )}

            {loading && !products.length && (
                <div className="bg-white rounded-lg shadow p-8 text-center text-slate-500">
                    ⏳ Загрузка данных...
                </div>
            )}

            {products.length > 0 && <DataTable columns={columns} data={products} />}
        </div>
    );
}
import { useEffect, useState } from "react";
import DataTable, { type Column } from "../components/DataTable";
import UserForm from "../components/UserForm";
import { usersApi } from "../api/users";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types";

export default function Users() {
    const { data, loading, error } = useFetch<User[]>(() => usersApi.list(), []);

    const [users, setUsers] = useState<User[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);

    // когда данные пришли с API — сохраняем в локальное состояние,
    // чтобы можно было менять (создавать/удалять) без перезагрузки
    useEffect(() => {
        if (data) setUsers(data);
    }, [data]);

    const handleCreate = async (formData: Omit<User, "id">) => {
        const optimistic: User = { ...formData, id: Date.now() };
        setUsers((prev) => [optimistic, ...prev]);
        setShowForm(false);
        try {
            await usersApi.create(formData);
        } catch {
            alert("Ошибка создания");
        }
    };

    const handleUpdate = async (formData: Omit<User, "id">) => {
        if (!editing) return;
        const id = editing.id;
        setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...formData } : u))
        );
        setEditing(null);
        setShowForm(false);
        try {
            await usersApi.update(id, formData);
        } catch {
            alert("Ошибка обновления");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить пользователя?")) return;
        setUsers((prev) => prev.filter((u) => u.id !== id));
        try {
            await usersApi.remove(id);
        } catch {
            alert("Ошибка удаления");
        }
    };

    const columns: Column<User>[] = [
        { id: "id", key: "id", label: "ID" },
        { id: "name", key: "name", label: "Имя" },
        { id: "email", key: "email", label: "Email" },
        { id: "phone", key: "phone", label: "Телефон" },
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
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-600 hover:underline text-sm"
                    >
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
                    <h1 className="text-3xl font-bold text-slate-800">👥 Пользователи</h1>
                    <p className="text-slate-500 mt-1">
                        {loading ? "Загрузка..." : `Всего: ${users.length}`}
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
                <UserForm
                    initial={editing ?? {}}
                    onSubmit={editing ? handleUpdate : handleCreate}
                    onCancel={() => {
                        setShowForm(false);
                        setEditing(null);
                    }}
                />
            )}

            {users.length > 0 ? `Всего: ${users.length}` : "Загрузка..."}

            {users.length > 0 && <DataTable columns={columns} data={users} />}
        </div>
    );
}
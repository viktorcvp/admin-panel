import { useState } from "react";
import type { User } from "../types";

interface Props {
    initial?: Partial<User>;
    onSubmit: (data: Omit<User, "id">) => void;
    onCancel: () => void;
}

export default function UserForm({ initial = {}, onSubmit, onCancel }: Props) {
    const [name, setName] = useState(initial.name ?? "");
    const [email, setEmail] = useState(initial.email ?? "");
    const [phone, setPhone] = useState(initial.phone ?? "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, phone });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 max-w-xl"
        >
            <h2 className="text-xl font-bold text-slate-800">
                {initial.id ? "✏️ Редактирование" : "➕ Новый пользователь"}
            </h2>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Имя</span>
                <input
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Петров"
                    required
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Email</span>
                <input
                    type="email"
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ivan@mail.ru"
                    required
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Телефон</span>
                <input
                    className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 900 111-22-33"
                />
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
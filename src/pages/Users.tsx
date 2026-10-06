import DataTable, { type Column } from "../components/DataTable";
import type { User } from "../types";

const mockUsers: User[] = [
    { id: 1, name: "Иван Петров", email: "ivan@mail.ru", phone: "+7 900 111-22-33" },
    { id: 2, name: "Мария Сидорова", email: "maria@mail.ru", phone: "+7 900 222-33-44" },
    { id: 3, name: "Алексей Иванов", email: "alex@mail.ru", phone: "+7 900 333-44-55" },
    { id: 4, name: "Ольга Кузнецова", email: "olga@mail.ru", phone: "+7 900 444-55-66" },
];

const columns: Column<User>[] = [
    { id: "id", key: "id", label: "ID" },
    { id: "name", key: "name", label: "Имя" },
    { id: "email", key: "email", label: "Email" },
    { id: "phone", key: "phone", label: "Телефон" },
];

export default function Users() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">👥 Пользователи</h1>
                <p className="text-slate-500 mt-1">Всего: {mockUsers.length}</p>
            </div>

            <DataTable columns={columns} data={mockUsers} />
        </div>
    );
}
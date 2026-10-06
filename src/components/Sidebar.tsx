import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "📊 Дашборд", end: true },
    { to: "/users", label: "👥 Пользователи" },
    { to: "/products", label: "📦 Товары" },
];

export default function Sidebar() {
    return (
        <aside className="w-60 bg-slate-800 text-white p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-6 px-3">Админка</h2>
            <nav className="flex flex-col gap-1">
                {links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.end}
                        className={({ isActive }) =>
                            `px-3 py-2 rounded transition-colors ${isActive
                                ? "bg-slate-600 text-white"
                                : "text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`
                        }
                    >
                        {l.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
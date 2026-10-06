import type { ReactNode } from "react";

export interface Column<T> {
    id: string;
    key: keyof T;
    label: string;
    render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

export default function DataTable<T extends { id: number | string }>({
    columns,
    data,
}: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((c) => (
                            <th
                                key={c.id}
                                className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                            >
                                {c.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-6 text-center text-gray-400"
                            >
                                Нет данных
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={String(row.id)} className="hover:bg-gray-50">
                                {columns.map((c) => (
                                    <td key={c.id} className="px-4 py-3 text-gray-700">
                                        {c.render ? c.render(row) : String(row[c.key])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
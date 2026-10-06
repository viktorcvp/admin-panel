interface Props {
    title: string;
    value: string | number;
    accent?: string;
}

export default function Card({ title, value, accent = "bg-blue-500" }: Props) {
    return (
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
            <div className={`w-2 h-12 rounded ${accent}`} />
            <div>
                <p className="text-sm text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
}
export default function StatsCard({ label, value, desc, color, bg, border, icon }) {
    return (
        <div className={`bg-white overflow-hidden shadow-sm rounded-[2rem] p-6 border ${border} hover:shadow-md transition-shadow duration-300 relative group`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {label}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <p className={`text-4xl font-extrabold ${color}`}>
                            {value}
                        </p>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                        {desc}
                    </p>
                </div>
                <div className={`h-14 w-14 rounded-2xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

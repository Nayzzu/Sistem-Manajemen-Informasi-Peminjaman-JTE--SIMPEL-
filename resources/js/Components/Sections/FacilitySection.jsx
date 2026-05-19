import { Link } from "@inertiajs/react";
import { 
    Building, 
    FlaskConical, 
    MonitorSpeaker, 
    PackageSearch
} from "lucide-react";

function StatusBadge({ isAvailable }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                isAvailable
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-red-50 text-red-700 border-red-200"
            }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-red-500"} animate-pulse`}></span>
            {isAvailable ? "Tersedia" : "Dipinjam"}
        </span>
    );
}

export default function FacilitySection({ facilities }) {
    const getCategoryIcon = (category) => {
        if (!category) return <PackageSearch className="w-8 h-8 text-blue-500" />;
        switch (category.toLowerCase()) {
            case 'ruangan': return <Building className="w-8 h-8 text-blue-500" />;
            case 'laboratorium': return <FlaskConical className="w-8 h-8 text-blue-500" />;
            case 'inventaris': return <MonitorSpeaker className="w-8 h-8 text-blue-500" />;
            default: return <PackageSearch className="w-8 h-8 text-blue-500" />;
        }
    };

    return (
        <section id="fasilitas" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Daftar Fasilitas
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm font-medium">
                            Katalog Ruangan, Laboratorium, dan Barang Jurusan Teknik Elektro UNILA
                        </p>
                    </div>
                    <Link
                        href={route("facilities.index")}
                        className="mt-4 md:mt-0 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-blue-700 hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-0.5 transition-all shadow-sm"
                    >
                        Lihat Semua Katalog →
                    </Link>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities && facilities.length > 0 ? (
                        facilities.map((f, i) => (
                            <div
                                key={f.id || i}
                                className="bg-white border border-slate-100 p-8 rounded-[2rem] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                                        {getCategoryIcon(f.category)}
                                    </div>
                                    <StatusBadge isAvailable={f.is_available} />
                                </div>
                                <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                                    {f.name}
                                </h3>
                                <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mt-2 mb-6 bg-indigo-50 inline-block px-3 py-1 rounded-lg border border-indigo-100 w-fit">
                                    {f.category}
                                </p>
                                
                                <div className="mt-auto">
                                    <Link
                                        href={route("facilities.index")}
                                        className={`block w-full py-3 text-center text-sm font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
                                            f.is_available 
                                                ? "bg-blue-700 text-white hover:bg-blue-800 hover:-translate-y-0.5" 
                                                : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                                        }`}
                                    >
                                        AJUKAN PINJAM
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-300">
                            <p className="text-slate-500 font-medium">Belum ada fasilitas yang tersedia.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

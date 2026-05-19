import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section
            id="beranda"
            className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white"
        >
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className="fade-up">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-extrabold uppercase tracking-widest mb-6">
                        Official Facility Portal
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                        Proses{" "}
                        <span className="text-blue-700">
                            Peminjaman Fasilitas
                        </span>{" "}
                        Jurusan Jadi Lebih Teratur dan{" "}
                        <span className="text-yellow-500 italic"> SIMPEL.</span>
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg">
                        Sistem Informasi Manajemen Peminjaman Jurusan Elektro
                        Universitas Lampung. Layanan terpadu untuk peminjaman
                        fasilitas yang ada di JTE secara daring.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={route("register")}
                            className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all"
                        >
                            Ajukan Peminjaman
                        </Link>
                        <a
                            href="#fasilitas"
                            className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                        >
                            Lihat Daftar Fasilitas
                        </a>
                    </div>
                </div>
                <div className="hidden lg:block fade-up">
                    <img
                        src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
                        className="rounded-[2rem] shadow-2xl border border-white"
                        alt="Lab Elektro"
                    />
                </div>
            </div>
        </section>
    );
}

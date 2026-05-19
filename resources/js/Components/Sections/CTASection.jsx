import { Link } from "@inertiajs/react";

export default function CTASection() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-blue-700 rounded-[3rem] p-10 md:p-20 text-center overflow-hidden shadow-2xl shadow-blue-200">
                    {/* Hiasan Pola Sirkuit (Opsional - Efek Estetik) */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg
                            width="100%"
                            height="100%"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern
                                    id="grid"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path
                                        d="M 40 0 L 0 0 0 40"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="1"
                                    />
                                </pattern>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                fill="url(#grid)"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Kegiatan Jurusan Jadi Lebih Lancar? <br />
                            <span className="text-yellow-400 font-black italic text-4xl md:text-6xl">
                                SIMPEL.
                            </span>{" "}
                            kan urusanmu.
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                            Mau pinjam proyektor buat seminar, booking ruangan buat acara Kampus, atau butuh ruagan H5 untuk perkuliahan
                            ? Lupakan proses birokrasi manual yang ribet. Cek
                            ketersediaan aset Jurusan Teknik Elektro secara
                            real-time di sini.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href={route("register")}
                                className="px-10 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-xl hover:-translate-y-1"
                            >
                                Mulai Peminjaman
                            </Link>
                            <Link
                                href="#fasilitas"
                                className="px-10 py-4 bg-blue-800 text-white font-bold rounded-2xl border border-blue-600 hover:bg-blue-900 transition-all"
                            >
                                Lihat Daftar Fasilitas
                            </Link>
                        </div>

                        <p className="mt-8 text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                            ⚡ Satu Pintu untuk Semua Fasilitas Jurusan Teknik
                            Elektro
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

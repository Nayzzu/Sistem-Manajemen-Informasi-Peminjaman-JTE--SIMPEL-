import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Bagian Utama Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Kolom 1: Branding & Deskripsi */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            {/* Logo Petir Khas SIMPEL */}
                            <img
                                src="/images/logo-petir.png"
                                alt="Logo SIMPEL"
                                className="w-25 h-10 object-contain"
                            />
                            <span className="text-2xl font-black tracking-tighter text-white">
                                SIMPEL<span className="text-yellow-400">.</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Solusi digital terpadu untuk manajemen peminjaman
                            fasilitas, ruangan, dan sarana prasarana di
                            lingkungan Jurusan Teknik Elektro Universitas
                            Lampung.
                        </p>
                    </div>

                    {/* Kolom 2: Navigasi Cepat */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
                            Tautan Cepat
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#fasilitas"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Daftar Fasilitas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#cara-kerja"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Prosedur Pinjam
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3: Kontak Jurusan */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400">📍</span>
                                Gedung H, Teknik Elektro Unila, Jl. Prof.
                                Sumantri Brojonegoro No.1.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-yellow-400">📧</span>
                                elektro@eng.unila.ac.id
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 4: Media Sosial / Info Lain */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
                            Ikuti Kami
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all"
                            >
                                <span>IG</span>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all"
                            >
                                <span>YT</span>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all"
                            >
                                <span>FB</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian Bawah: Copyright */}
            <div className="border-t border-slate-800 bg-slate-950/50 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    <div>
                        © {new Date().getFullYear()} UNIVERSITAS LAMPUNG. ALL
                        RIGHTS RESERVED.
                    </div>
                    <div className="flex items-center gap-2">
                        DEVELOPED BY{" "}
                        <span className="text-slate-300">
                            TEKNIK INFORMATIKA
                        </span>{" "}
                        JURUSAN{" "}
                        <span className="text-blue-500">TEKNIK ELEKTRO</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

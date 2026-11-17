import { useState } from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { Menu, X } from "lucide-react";

export default function Navbar({ scrolled, auth, isDashboard = false }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled || isDashboard || mobileOpen
                    ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/logo-petir.png"
                        alt="Logo SIMPEL"
                        className="w-20 h-10 object-contain"
                    />
                    <div>
                        <span className="block font-[800] text-xl leading-none tracking-tighter text-blue-900">
                            SIMPEL<span className="text-yellow-500">.</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Teknik Elektro Unila
                        </span>
                    </div>
                </Link>

                {/* TOMBOL MENU MOBILE */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                    aria-label="Toggle Menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* MENU NAVIGASI TENGAH */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-8 text-sm font-bold text-slate-600">
                        {isDashboard ? (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className={
                                            route().current("dashboard")
                                                ? "text-blue-700"
                                                : "hover:text-blue-700"
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("facilities.index")}
                                        className={
                                            route().current("facilities.*")
                                                ? "text-blue-700 font-bold"
                                                : "hover:text-blue-700 transition-colors"
                                        }
                                    >
                                        Daftar Fasilitas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("bookings.activeList")}
                                        className={
                                            route().current("bookings.activeList")
                                                ? "text-blue-700 font-bold"
                                                : "hover:text-blue-700 transition-colors"
                                        }
                                    >
                                        Peminjaman Aktif
                                    </Link>
                                </li>
                                {auth.user?.role === "admin" && (
                                    <>
                                        <li>
                                            <Link
                                                href={route("admin.approvals")}
                                                className={
                                                    route().current("admin.approvals")
                                                        ? "text-blue-700 font-bold"
                                                        : "hover:text-blue-700 transition-colors"
                                                }
                                            >
                                                Verifikasi Admin
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route("admin.users")}
                                                className={
                                                    route().current("admin.users")
                                                        ? "text-blue-700 font-bold"
                                                        : "hover:text-blue-700 transition-colors"
                                                }
                                            >
                                                Pengguna
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <li>
                                    <a
                                        href="#beranda"
                                        className="hover:text-blue-700"
                                    >
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#fasilitas"
                                        className="hover:text-blue-700"
                                    >
                                        Fasilitas
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#cara-kerja"
                                        className="hover:text-blue-700"
                                    >
                                        Prosedur
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* KANAN ATAS: LOGIC LOGIN VS PROFIL */}
                    <div className="flex items-center ms-4 ps-4 border-l border-slate-200">
                        {auth.user ? (
                            /* JIKA USER SUDAH LOGIN */
                            isDashboard ? (
                                /* A. Tampilan khusus di dalam Dashboard: FOTO PROFIL */
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-3 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 shadow-sm"
                                            >
                                                <div className="text-right hidden lg:block">
                                                    <p className="text-[11px] font-[800] text-blue-900 leading-none">
                                                        {auth.user.name}
                                                    </p>
                                                    <p className="text-[9px] text-slate-500 mt-1 font-bold uppercase">
                                                        {auth.user.npm}
                                                    </p>
                                                </div>
                                                <div className="h-9 w-9 rounded-lg overflow-hidden bg-blue-700 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm ring-1 ring-blue-100">
                                                    {auth.user.foto ? (
                                                        <img
                                                            src={`/storage/${auth.user.foto}`}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        auth.user.name.charAt(0)
                                                    )}
                                                </div>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content
                                            align="right"
                                            width="48"
                                            contentClasses="py-2 bg-white rounded-2xl shadow-xl border border-slate-100 font-['Plus_Jakarta_Sans']"
                                        >
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Edit Profil
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("bookings.history")}
                                            >
                                                Riwayat Pinjam
                                            </Dropdown.Link>
                                            <div className="border-t border-slate-50 mt-1 pt-1">
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                    className="text-red-600 font-bold"
                                                >
                                                    Keluar Aplikasi
                                                </Dropdown.Link>
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                /* B. Tampilan di Landing Page saat sudah login: TOMBOL MASUK DASHBOARD */
                                <Link
                                    href={route("dashboard")}
                                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-[800] rounded-xl transition-all shadow-md shadow-blue-200"
                                >
                                    Masuk Dashboard
                                </Link>
                            )
                        ) : (
                            /* JIKA BELUM LOGIN: Tampilkan Tombol Masuk Sistem */
                            <Link
                                href={route("login")}
                                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-[800] rounded-xl transition-all shadow-md shadow-blue-200"
                            >
                                Masuk Sistem
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* MENU MOBILE DROPDOWN */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 shadow-lg">
                    {isDashboard ? (
                        <>
                            <Link
                                href={route("dashboard")}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("facilities.index")}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Daftar Fasilitas
                            </Link>
                            <Link
                                href={route("bookings.activeList")}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Peminjaman Aktif
                            </Link>
                            <Link
                                href={route("bookings.history")}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Riwayat Pinjam
                            </Link>
                            {auth.user?.role === "admin" && (
                                <>
                                    <Link
                                        href={route("admin.approvals")}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                                    >
                                        Verifikasi Admin
                                    </Link>
                                    <Link
                                        href={route("admin.users")}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                                    >
                                        Pengguna
                                    </Link>
                                </>
                            )}
                            <div className="pt-3 border-t border-slate-100 space-y-2">
                                <Link
                                    href={route("profile.edit")}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                                >
                                    Edit Profil
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left py-2 text-sm font-bold text-red-600"
                                >
                                    Keluar Aplikasi
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <a
                                href="#beranda"
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Beranda
                            </a>
                            <a
                                href="#fasilitas"
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Fasilitas
                            </a>
                            <a
                                href="#cara-kerja"
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-700"
                            >
                                Prosedur
                            </a>
                            <div className="pt-3 border-t border-slate-100">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="block w-full text-center px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-[800] rounded-xl"
                                    >
                                        Masuk Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="block w-full text-center px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-[800] rounded-xl"
                                    >
                                        Masuk Sistem
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

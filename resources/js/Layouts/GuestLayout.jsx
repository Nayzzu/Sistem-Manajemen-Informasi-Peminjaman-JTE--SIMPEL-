import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50">
            <div>
                <Link href="/" className="flex flex-col items-center gap-2">
                    {/* Logo Petir Kuning Khas SIMPEL */}
                    <img
                        src="/images/logo-petir.png"
                        alt="Logo SIMPEL"
                        className="w-25 h-20 object-contain"
                    />
                    <span className="text-2xl font-black tracking-tighter text-blue-900">
                        SIMPEL<span className="text-yellow-500">.</span>
                    </span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden sm:rounded-[2rem] border border-slate-100">
                {children}
            </div>

            <p className="mt-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
                Teknik Elektro Universitas Lampung
            </p>
        </div>
    );
}

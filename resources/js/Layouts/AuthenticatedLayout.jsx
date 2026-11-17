import Navbar from "@/Layouts/Navbar"; // Pastikan path ke file Navbar.jsx sudah benar
import { usePage, Head } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',_sans-serif]">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style>{`
                body { 
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                    letter-spacing: -0.01em; 
                }
            `}</style>

            {/* Memanggil Navbar adaptive yang sudah kita buat.
                isDashboard={true} akan otomatis mengubah menu menjadi menu internal (Dashboard, Fasilitas, dll)
            */}
            <Navbar auth={auth} isDashboard={true} />

            {/* HEADER AREA */}
            {header && (
                <header className="bg-white border-b border-slate-200 mt-20">
                    <div className="max-w-7xl mx-auto py-8 px-6">{header}</div>
                </header>
            )}

            {/* CONTENT AREA */}
            <main
                className={`${!header ? "pt-28" : "pt-6"} pb-12 transition-opacity duration-300`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

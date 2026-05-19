export default function StepsSection() {
    const STEPS = [
        {
            num: "1",
            title: "Login Akun",
            desc: "Masuk menggunakan NPM dan password.",
        },
        {
            num: "2",
            title: "Cek Fasilitas",
            desc: "Pilih Fasilitas yang tersedia.",
        },
        {
            num: "3",
            title: "Isi Form",
            desc: "Input jadwal dan tujuan penggunaan fasilitas.",
        },
        {
            num: "4",
            title: "Verifikasi & Ambil Fasilitas",
            desc: "Tunjukkan bukti Approve dari SIMPEL ke petugas.",
        },
    ];

    return (
        <section id="cara-kerja" className="py-24 bg-blue-700 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl font-extrabold mb-4 italic text-white">
                        Bagaimana Prosedurnya?
                    </h2>
                    <p className="text-blue-100 max-w-md text-sm">
                        Alur peminjaman yang disederhanakan untuk efisiensi
                        waktu mahasiswa dan dosen.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {STEPS.map((s, i) => (
                        <div key={i} className="relative group">
                            <div className="text-6xl font-black text-white/10 absolute -top-8 -left-2 group-hover:text-white/20 transition-colors">
                                {s.num}
                            </div>
                            <h3 className="relative text-lg font-bold mb-3">
                                {s.title}
                            </h3>
                            <p className="text-blue-100 text-xs leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

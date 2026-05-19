export default function MapSection() {
    return (
        <section id="lokasi" className="py-24 bg-white text-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        {/* Judul Baru yang lebih relevan dengan alur peminjaman */}
                        <h2 className="text-3xl font-extrabold mb-8 italic text-blue-700">
                            Unit Layanan & Verifikasi
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
                                    Lokasi Fisik
                                </h4>
                                <p className="text-slate-700 leading-relaxed font-medium">
                                    Seluruh proses verifikasi identitas (KTM)
                                    dan pengambilan kunci ruangan atau alat
                                    multimedia dilakukan di:
                                    <br />
                                    <strong className="text-blue-900">
                                        Ruang Administrasi, Lantai 2 Gedung H
                                    </strong>
                                    <br />
                                    Jurusan Teknik Elektro, Universitas Lampung.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                        Waktu Layanan
                                    </p>
                                    <p className="text-sm font-bold text-slate-700">
                                        Senin — Jumat
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        08:00 - 16:00 WIB
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                        Status Ruangan
                                    </p>
                                    <p className="text-sm font-bold text-blue-700">
                                        Update Real-time
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Cek di Dashboard
                                    </p>
                                </div>
                            </div>

                            {/* Pesan Tambahan agar mahasiswa tidak bingung */}
                            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                                <p className="text-xs text-yellow-800 leading-relaxed">
                                    <strong>Catatan:</strong> Pastikan status
                                    peminjaman Anda sudah
                                    <span className="font-bold text-green-700 uppercase mx-1">
                                        Approved
                                    </span>
                                    sebelum mendatangi loket pelayanan.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] w-full bg-slate-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative">
                        {/* Peta tetap dipertahankan untuk memandu mahasiswa baru/tamu */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.3332467475355!2d105.2415174758503!3d-5.365239194613589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dad679549321%3A0xc644c3c391b1f90b!2sJurusan%20Teknik%20Elektro%20Universitas%20Lampung!5e0!3m2!1sid!2sid!4v1714138000000!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

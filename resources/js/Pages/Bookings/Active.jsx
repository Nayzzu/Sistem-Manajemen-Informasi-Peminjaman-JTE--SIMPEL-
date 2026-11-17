import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { CalendarCheck, UserCircle, Clock, Building, Box } from "lucide-react";

export default function ActiveBookings({ activeBookings }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Peminjaman Aktif" />
            <div className="py-10 bg-slate-50 min-h-screen font-['Plus_Jakarta_Sans']">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="h-16 w-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-200">
                            <CalendarCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-[800] text-slate-900 tracking-tight">Daftar Peminjaman Aktif</h2>
                            <p className="mt-1 text-slate-500 font-medium">Informasi fasilitas yang sedang digunakan saat ini oleh mahasiswa.</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-3xl border border-slate-200 overflow-hidden min-h-[300px]">
                        {activeBookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4">Fasilitas</th>
                                            <th className="px-6 py-4">Peminjam</th>
                                            <th className="px-6 py-4 min-w-[200px]">Jadwal Penggunaan</th>
                                            <th className="px-6 py-4 min-w-[200px]">Alasan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {activeBookings.map(booking => (
                                            <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                                                            {booking.facility?.category === 'ruangan' ? <Building className="w-5 h-5" /> : <Box className="w-5 h-5" />}
                                                        </div>
                                                        <div className="font-[800] text-slate-900">{booking.facility?.name ?? 'Fasilitas Dihapus'}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800 flex items-center gap-1.5"><UserCircle className="w-4 h-4 text-slate-400" /> {booking.user?.name ?? '-'}</div>
                                                    <div className="text-xs text-slate-500 font-medium mt-1">NPM: {booking.user?.npm ?? '-'}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1.5 text-xs">
                                                        <span className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 w-max px-2.5 py-1 rounded-md border border-emerald-100">
                                                            <Clock className="w-3.5 h-3.5" /> {formatDate(booking.start_time)}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 font-bold text-slate-600 bg-slate-50 w-max px-2.5 py-1 rounded-md border border-slate-200">
                                                            <Clock className="w-3.5 h-3.5" /> {formatDate(booking.end_time)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-medium text-slate-600 italic line-clamp-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                                        "{booking.reason}"
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-dashed border-slate-200">
                                    <Building className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-[800] text-slate-800">Tidak Ada Peminjaman Aktif</h3>
                                <p className="text-slate-500 font-medium mt-2">Semua fasilitas sistem saat ini berstatus tersedia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

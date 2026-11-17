import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    History as HistoryIcon,
    CalendarClock, 
    CalendarCheck2, 
    FileText, 
    FolderOpen,
    Plus
} from "lucide-react";

import StatusBadge from "@/Components/UI/StatusBadge";

export default function History({ bookings }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Peminjaman" />

            <div className="py-10 font-['Plus_Jakarta_Sans'] bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 shadow-sm border border-blue-200">
                                <HistoryIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-[800] text-slate-900 tracking-tight">Riwayat Peminjaman</h2>
                                <p className="mt-1 text-slate-500 font-medium">Lacak status pengajuan fasilitas Anda di sini.</p>
                            </div>
                        </div>
                        <Link
                            href={route('facilities.index')}
                            className="px-6 py-3 bg-blue-700 text-white font-bold rounded-xl shadow-sm hover:bg-blue-800 transition flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" /> Pinjam Fasilitas Baru
                        </Link>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-[2rem] border border-slate-100 overflow-hidden min-h-[400px]">
                        {bookings.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="p-8 hover:bg-slate-50 transition-colors border-l-4 border-transparent hover:border-blue-400">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-[800] text-slate-900 mb-4">
                                                    {booking.facility?.name ?? 'Fasilitas Dihapus'}
                                                </h3>
                                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-slate-600 font-medium">
                                                    <div className="space-y-2">
                                                        <p className="flex items-center gap-2"><CalendarClock className="w-4 h-4 text-slate-400" /> <span className="font-bold text-slate-800">Mulai:</span> {formatDate(booking.start_time)}</p>
                                                        <p className="flex items-center gap-2"><CalendarCheck2 className="w-4 h-4 text-slate-400" /> <span className="font-bold text-slate-800">Selesai:</span> {formatDate(booking.end_time)}</p>
                                                    </div>
                                                    <div className="hidden sm:block w-px bg-slate-200"></div>
                                                    <div className="flex-1 max-w-lg">
                                                        <p className="flex gap-2 items-start">
                                                            <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" /> 
                                                            <span><span className="font-bold text-slate-800">Alasan:</span> {booking.reason}</span>
                                                        </p>
                                                        {booking.admin_notes && (
                                                            <div className={`mt-3 p-3 border rounded-xl text-xs md:text-sm ${booking.status === 'rejected' ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
                                                                <span className="font-bold">Catatan Admin:</span> {booking.admin_notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                                                <StatusBadge status={booking.status} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[400px]">
                                <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200 mb-6">
                                    <FolderOpen className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-xl">Belum Ada Riwayat</h3>
                                <p className="text-slate-500 font-medium mt-2">
                                    Anda belum pernah mengajukan peminjaman fasilitas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

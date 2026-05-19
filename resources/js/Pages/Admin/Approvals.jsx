import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { 
    ClipboardList, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    FileText, 
    Building, 
    Box, 
    UserCircle,
    CalendarDays,
    CheckSquare
} from "lucide-react";

export default function Approvals({ pendingBookings, activeBookings }) {
    const [activeTab, setActiveTab] = useState('pending');
    const [processing, setProcessing] = useState(false);

    const handleStatusUpdate = (id, status) => {
        let admin_notes = null;
        if (status === 'rejected') {
            admin_notes = window.prompt("Berikan alasan penolakan (kosongkan jika tidak ada):");
            if (admin_notes === null) return; // Batal
        }

        if (confirm(`Apakah Anda yakin ingin mengubah status menjadi ${status}?`)) {
            setProcessing(true);
            router.post(route('admin.bookings.update', id), { status, admin_notes }, {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Verifikasi Admin" />

            <div className="py-10 font-['Plus_Jakarta_Sans'] bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 shadow-sm border border-blue-200">
                                <ClipboardList className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-[800] text-slate-900 tracking-tight">Manajemen Peminjaman</h2>
                                <p className="mt-1 text-slate-500 font-medium">Verifikasi pengajuan mahasiswa dan pantau peminjaman aktif.</p>
                            </div>
                        </div>
                        <a href={route('admin.export')} className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 self-start sm:self-center">
                            <FileText className="w-4 h-4" /> Export Laporan (CSV)
                        </a>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-6 mb-6 border-b border-slate-200 px-2">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`pb-4 text-sm font-bold transition-colors flex items-center gap-2 ${
                                activeTab === 'pending'
                                    ? 'border-b-[3px] border-amber-500 text-amber-600'
                                    : 'text-slate-500 hover:text-slate-700 border-b-[3px] border-transparent'
                            }`}
                        >
                            <Clock className={`w-4 h-4 ${activeTab === 'pending' ? 'text-amber-500' : 'text-slate-400'}`} />
                            Menunggu Persetujuan
                            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${activeTab === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                {pendingBookings.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`pb-4 text-sm font-bold transition-colors flex items-center gap-2 ${
                                activeTab === 'active'
                                    ? 'border-b-[3px] border-emerald-500 text-emerald-600'
                                    : 'text-slate-500 hover:text-slate-700 border-b-[3px] border-transparent'
                            }`}
                        >
                            <CheckCircle2 className={`w-4 h-4 ${activeTab === 'active' ? 'text-emerald-500' : 'text-slate-400'}`} />
                            Peminjaman Aktif
                            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${activeTab === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                {activeBookings.length}
                            </span>
                        </button>
                    </div>

                    {/* Content: Pending Bookings */}
                    {activeTab === 'pending' && (
                        <div className="bg-white shadow-sm sm:rounded-3xl border border-slate-200 overflow-hidden min-h-[400px]">
                            {pendingBookings.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {pendingBookings.map((booking) => (
                                        <div key={booking.id} className="p-8 hover:bg-slate-50 transition border-l-4 border-transparent hover:border-amber-400">
                                            <div className="flex flex-col lg:flex-row justify-between gap-8">
                                                <div className="flex-1 space-y-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                                            {booking.facility.category === 'ruangan' ? <Building className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-[800] text-slate-900">{booking.facility.name}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <UserCircle className="w-4 h-4 text-slate-400" />
                                                                <p className="text-sm text-slate-600 font-medium"><span className="font-bold text-slate-800">{booking.user.name}</span> ({booking.user.npm})</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                                        <div>
                                                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Jadwal Pemakaian</p>
                                                            <p className="font-bold text-slate-800">{formatDate(booking.start_time)}</p>
                                                            <p className="font-bold text-slate-800 text-amber-600">s/d {formatDate(booking.end_time)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Alasan Peminjaman</p>
                                                            <p className="font-medium text-slate-700 italic border-l-2 border-slate-200 pl-3">{booking.reason}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    {booking.attachment && (
                                                        <div className="mt-2 inline-block">
                                                            <a href={`/storage/${booking.attachment}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-100 border border-blue-200 transition-colors shadow-sm group">
                                                                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                                Lihat Surat Permohonan
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex flex-row lg:flex-col gap-3 justify-center min-w-[170px]">
                                                    <button
                                                        disabled={processing}
                                                        onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                                        className="relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 flex-1 overflow-hidden group"
                                                    >
                                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                                        <CheckCircle2 className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" /> 
                                                        <span className="relative z-10">Terima</span>
                                                    </button>
                                                    <button
                                                        disabled={processing}
                                                        onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                                                        className="px-6 py-3 bg-white text-rose-600 font-bold rounded-xl shadow-sm border-2 border-rose-100 hover:bg-rose-50 hover:border-rose-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(225,29,72,0.2)] transition-all duration-300 flex items-center justify-center gap-2 flex-1 group"
                                                    >
                                                        <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                                                        <span>Tolak</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[400px]">
                                    <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200 mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                    </div>
                                    <h3 className="text-slate-900 font-bold text-xl">Semua Bersih!</h3>
                                    <p className="text-slate-500 font-medium mt-2">Tidak ada pengajuan peminjaman baru saat ini.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content: Active Bookings */}
                    {activeTab === 'active' && (
                        <div className="bg-white shadow-sm sm:rounded-3xl border border-slate-200 overflow-hidden min-h-[400px]">
                            {activeBookings.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {activeBookings.map((booking) => (
                                        <div key={booking.id} className="p-6 lg:p-8 hover:bg-slate-50 transition border-l-4 border-emerald-500">
                                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                                <div className="flex-1 flex gap-5 w-full">
                                                    <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                                        {booking.facility.category === 'ruangan' ? <Building className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                                                    </div>
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-[800] text-slate-900">{booking.facility.name}</h3>
                                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-widest flex items-center gap-1 border border-emerald-200">
                                                                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                                                Sedang Dipinjam
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                                                            <p className="text-sm text-slate-600 font-medium flex items-center gap-1.5">
                                                                <UserCircle className="w-4 h-4 text-slate-400" />
                                                                <span className="font-bold text-slate-800">{booking.user.name}</span>
                                                            </p>
                                                            <p className="text-sm text-slate-600 font-medium flex items-center gap-1.5">
                                                                <Clock className="w-4 h-4 text-slate-400" />
                                                                Berakhir: <span className="font-bold text-red-500">{formatDate(booking.end_time)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="w-full md:w-auto">
                                                    <button
                                                        disabled={processing}
                                                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                                        className="w-full md:w-auto px-6 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group"
                                                    >
                                                        <CheckSquare className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" /> Tandai Selesai
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[400px]">
                                    <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200 mb-6">
                                        <Building className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-slate-900 font-bold text-xl">Tidak Ada Peminjaman Aktif</h3>
                                    <p className="text-slate-500 font-medium mt-2">Belum ada fasilitas yang sedang digunakan saat ini.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

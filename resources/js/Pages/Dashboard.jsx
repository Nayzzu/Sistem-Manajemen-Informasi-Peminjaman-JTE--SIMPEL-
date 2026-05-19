import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
    LayoutDashboard, 
    Clock, 
    CheckCircle2, 
    CheckSquare, 
    Box, 
    Building, 
    CalendarCheck,
    FileText,
    ArrowRight
} from "lucide-react";

import StatsCard from "@/Components/UI/StatsCard";
import ActivityItem from "@/Components/UI/ActivityItem";

export default function Dashboard() {
    const { auth, stats: backendStats, recent_activities } = usePage().props;
    const isAdmin = auth.user.role === "admin";

    const defaultStats = {
        total_facilities: 0,
        pending_approvals: 0,
        active_bookings: 0,
        user_bookings: 0,
        approved_bookings: 0,
        pending_bookings: 0,
    };

    const currentStats = backendStats || defaultStats;

    // Data statistik dari DashboardController
    const stats = isAdmin
        ? [
              {
                  label: "Total Fasilitas",
                  value: currentStats.total_facilities,
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                  border: "border-blue-100",
                  desc: "Aset terdaftar di sistem",
                  icon: <Box className="w-7 h-7 text-blue-600" />
              },
              {
                  label: "Pending Approval",
                  value: currentStats.pending_approvals,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                  border: "border-amber-100",
                  desc: "Perlu diverifikasi admin",
                  icon: <Clock className="w-7 h-7 text-amber-500" />
              },
              {
                  label: "Peminjaman Aktif",
                  value: currentStats.active_bookings,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                  border: "border-emerald-100",
                  desc: "Sedang digunakan",
                  icon: <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              },
          ]
        : [
              {
                  label: "Pinjaman Saya",
                  value: currentStats.user_bookings,
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                  border: "border-blue-100",
                  desc: "Total riwayat peminjaman",
                  icon: <FileText className="w-7 h-7 text-blue-600" />
              },
              {
                  label: "Status Disetujui",
                  value: currentStats.approved_bookings,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                  border: "border-emerald-100",
                  desc: "Siap ambil alat/kunci",
                  icon: <CheckSquare className="w-7 h-7 text-emerald-500" />
              },
              {
                  label: "Status Pending",
                  value: currentStats.pending_bookings,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                  border: "border-amber-100",
                  desc: "Menunggu acc admin",
                  icon: <Clock className="w-7 h-7 text-amber-500" />
              },
          ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-10 bg-slate-50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Welcome Card & Profile Information */}
                    <div className="overflow-hidden bg-white shadow-sm rounded-[2rem] p-8 border border-slate-100 relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <LayoutDashboard className="w-48 h-48" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                            <div className="flex-shrink-0">
                                {auth.user.foto ? (
                                    <img
                                        className="h-24 w-24 rounded-2xl object-cover shadow-md ring-4 ring-slate-50"
                                        src={`/storage/${auth.user.foto}`}
                                        alt={auth.user.name}
                                    />
                                ) : (
                                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-3xl shadow-md ring-4 ring-slate-50">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Selamat Datang kembali, {auth.user.name.split(' ')[0]}!
                                </h3>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                                    <span className="text-blue-700 uppercase text-[10px] tracking-widest font-bold bg-blue-50 border border-blue-100 px-3 py-1 rounded-md">
                                        {auth.user.role}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-500">
                                        NPM: {auth.user.npm}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Aktivitas Terakhir Table */}
                    <div className="bg-white shadow-sm rounded-[2rem] border border-slate-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <CalendarCheck className="w-5 h-5 text-blue-600" />
                                Aktivitas Peminjaman Terakhir
                            </h3>
                            <Link 
                                href={isAdmin ? route('admin.approvals') : route('bookings.history')}
                                className="text-sm text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1"
                            >
                                Lihat Semua <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        {recent_activities && recent_activities.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {recent_activities.map((activity) => (
                                    <ActivityItem key={activity.id} activity={activity} isAdmin={isAdmin} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
                                    <Box className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg">Belum Ada Aktivitas</h3>
                                <p className="text-slate-500 font-medium mt-1">
                                    Mulai ajukan peminjaman fasilitas di menu daftar fasilitas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

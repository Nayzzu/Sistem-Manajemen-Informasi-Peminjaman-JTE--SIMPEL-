import { Box, Building } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ActivityItem({ activity, isAdmin }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="p-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500">
                    {activity.facility.category === 'ruangan' ? <Building className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                </div>
                <div>
                    <p className="font-bold text-slate-900 text-lg">
                        {isAdmin ? `${activity.user.name} meminjam` : 'Meminjam'} <span className="text-blue-700">{activity.facility.name}</span>
                    </p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                        Diajukan pada {formatDate(activity.created_at)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jadwal</p>
                    <p className="text-sm font-semibold text-slate-700">{formatDate(activity.start_time)} - {formatDate(activity.end_time)}</p>
                </div>
                <StatusBadge status={activity.status} />
            </div>
        </div>
    );
}

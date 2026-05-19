import { CheckCircle2, Clock, XCircle, CheckSquare } from "lucide-react";

export default function StatusBadge({ status }) {
    switch (status) {
        case 'approved': 
            return (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui
                </span>
            );
        case 'pending': 
            return (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 w-fit">
                    <Clock className="w-3.5 h-3.5" /> Menunggu
                </span>
            );
        case 'rejected': 
            return (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200 w-fit">
                    <XCircle className="w-3.5 h-3.5" /> Ditolak
                </span>
            );
        case 'completed': 
            return (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200 w-fit">
                    <CheckSquare className="w-3.5 h-3.5" /> Selesai
                </span>
            );
        default: 
            return null;
    }
}

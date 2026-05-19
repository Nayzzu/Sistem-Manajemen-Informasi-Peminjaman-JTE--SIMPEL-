import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Users, Shield, ShieldOff, CheckCircle, XCircle } from "lucide-react";

export default function UserManagement({ users }) {
    const [processing, setProcessing] = useState(false);

    const handleRoleUpdate = (user, newRole) => {
        if (confirm(`Jadikan ${user.name} sebagai ${newRole}?`)) {
            setProcessing(true);
            router.post(route('admin.users.role', user.id), { role: newRole }, {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            });
        }
    };

    const handleStatusUpdate = (user, newStatus) => {
        const action = newStatus ? "Setujui/Aktifkan" : "Nonaktifkan";
        if (confirm(`Apakah Anda yakin ingin ${action} akun ${user.name}?`)) {
            setProcessing(true);
            router.post(route('admin.users.status', user.id), { status_aktif: newStatus }, {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Pengguna" />
            <div className="py-10 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="h-16 w-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 shadow-sm border border-indigo-200">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-[800] text-slate-900 tracking-tight">Manajemen Pengguna</h2>
                            <p className="mt-1 text-slate-500 font-medium">Atur persetujuan pendaftaran akun dan kelola peran admin.</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-3xl border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Pengguna</th>
                                        <th className="px-6 py-4">NPM / Prodi</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Peran</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                                <div className="text-xs text-slate-500">{user.nomor_telepon}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-800">{user.npm}</div>
                                                <div className="text-xs text-slate-500">{user.program_studi || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.status_aktif ? (
                                                    <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200">Aktif</span>
                                                ) : (
                                                    <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-100 text-rose-700 border border-rose-200">Menunggu Acc</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.role === 'admin' ? (
                                                    <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-700 flex items-center gap-1 w-max border border-indigo-200"><Shield className="w-3 h-3" /> Admin</span>
                                                ) : (
                                                    <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200">Mahasiswa</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 flex gap-2 justify-end">
                                                {!user.status_aktif ? (
                                                    <button onClick={() => handleStatusUpdate(user, true)} disabled={processing} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Setujui/Aktifkan Akun">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleStatusUpdate(user, false)} disabled={processing} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Nonaktifkan Akun">
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                )}

                                                {user.role === 'admin' ? (
                                                    <button onClick={() => handleRoleUpdate(user, 'mahasiswa')} disabled={processing} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Cabut Akses Admin">
                                                        <ShieldOff className="w-5 h-5" />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleRoleUpdate(user, 'admin')} disabled={processing} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Jadikan Admin">
                                                        <Shield className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

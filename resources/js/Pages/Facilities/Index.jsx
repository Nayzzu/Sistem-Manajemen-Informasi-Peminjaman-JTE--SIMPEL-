import Button from '@/Components/Button';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    Building,
    FlaskConical,
    MonitorSpeaker,
    SearchX,
    Zap,
    ShieldCheck,
    PackageSearch,
    MapPin,
    AlertCircle,
    Box,
    Users,
} from "lucide-react";

export default function Index({ facilities }) {
    const [filter, setFilter] = useState("semua");
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            facility_id: "",
            start_time: "",
            end_time: "",
            reason: "",
            attachment: null,
        });

    // Logika Filter Kategori
    const filteredFacilities =
        filter === "semua"
            ? facilities
            : facilities.filter((f) => f.category.toLowerCase() === filter);

    const categories = [
        {
            id: "semua",
            label: "Semua Fasilitas",
            icon: <PackageSearch className="w-4 h-4" />,
        },
        {
            id: "ruangan",
            label: "Ruangan",
            icon: <Building className="w-4 h-4" />,
        },
        {
            id: "laboratorium",
            label: "Laboratorium",
            icon: <FlaskConical className="w-4 h-4" />,
        },
        {
            id: "inventaris",
            label: "Barang/Alat",
            icon: <MonitorSpeaker className="w-4 h-4" />,
        },
    ];

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "ruangan":
                return <Building className="w-5 h-5 text-indigo-500" />;
            case "laboratorium":
                return <FlaskConical className="w-5 h-5 text-indigo-500" />;
            case "inventaris":
                return <MonitorSpeaker className="w-5 h-5 text-indigo-500" />;
            default:
                return <PackageSearch className="w-5 h-5 text-indigo-500" />;
        }
    };

    const openBookingModal = (facility) => {
        setSelectedFacility(facility);
        setData({
            ...data,
            facility_id: facility.id,
            start_time: "",
            end_time: "",
            reason: "",
            attachment: null,
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsModalOpen(false);
        reset();
        setSelectedFacility(null);
    };

    const submitBooking = (e) => {
        e.preventDefault();
        post(route("bookings.store"), {
            forceFormData: true,
            onSuccess: () => closeBookingModal(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Fasilitas" />

            <div className="py-10 font-['Plus_Jakarta_Sans'] bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-[800] text-slate-900 tracking-tight">
                                Daftar Fasilitas
                            </h1>
                            <p className="text-slate-500 mt-2 font-medium flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-blue-600" />{" "}
                                Pilih fasilitas Teknik Elektro yang ingin kamu
                                pinjam.
                            </p>
                        </div>

                        {/* Filter Tab */}
                        <div className="flex bg-white shadow-sm border border-slate-100 p-1.5 rounded-2xl overflow-x-auto whitespace-nowrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                                        filter === cat.id
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                    }`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid Fasilitas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFacilities.map((facility) => (
                            <div
                                key={facility.id}
                                className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
                            >
                                <div className="p-8 flex-1 flex flex-col">
                                    {/* Badge & Status */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-xl border border-indigo-100">
                                            {getCategoryIcon(facility.category)}
                                            <span className="text-indigo-700 text-xs font-bold uppercase tracking-widest">
                                                {facility.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full ${facility.is_available ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-red-500"} animate-pulse`}
                                            ></div>
                                            <span
                                                className={`text-[10px] font-extrabold uppercase tracking-widest ${facility.is_available ? "text-emerald-600" : "text-red-600"}`}
                                            >
                                                {facility.is_available
                                                    ? "Tersedia"
                                                    : "Dipinjam"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info Utama */}
                                    <h3 className="text-2xl font-[800] text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                                        {facility.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed font-medium flex-1">
                                        {facility.description}
                                    </p>

                                    {facility.capacity && (
                                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 font-bold border-t border-slate-100 pt-3">
                                            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            Kapasitas: {facility.capacity}
                                        </div>
                                    )}

                                    {/* Aturan Persetujuan */}
                                    <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div
                                            className={`p-1.5 rounded-lg ${facility.needs_kajur_approval ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}
                                        >
                                            {facility.needs_kajur_approval ? (
                                                <Zap className="w-4 h-4" />
                                            ) : (
                                                <ShieldCheck className="w-4 h-4" />
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-slate-600">
                                            {facility.needs_kajur_approval
                                                ? "Butuh Izin Kepala Jurusan"
                                                : "Cukup Izin Admin"}
                                        </span>
                                    </div>

                                    {/* Tombol Aksi */}
                                    <button
                                        onClick={() =>
                                            openBookingModal(facility)
                                        }
                                        disabled={!facility.is_available}
                                        className={`w-full mt-8 py-4 rounded-2xl text-sm font-[800] transition-all duration-300 flex items-center justify-center gap-2 ${
                                            facility.is_available
                                                ? "bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-100 hover:-translate-y-0.5"
                                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        }`}
                                    >
                                        {facility.is_available
                                            ? "Pinjam Sekarang"
                                            : "Sedang Tidak Tersedia"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredFacilities.length === 0 && (
                        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-300 shadow-sm mt-8">
                            <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SearchX className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-slate-900 font-bold text-2xl tracking-tight">
                                Tidak Menemukan Hasil
                            </h3>
                            <p className="text-slate-500 font-medium mt-2">
                                Maaf, fasilitas di kategori ini sedang kosong.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Booking */}
            <Modal show={isModalOpen} onClose={closeBookingModal} maxWidth="xl">
                <div className="font-['Plus_Jakarta_Sans']">
                    {/* Modal Header */}
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-[800] text-slate-900">
                                Pinjam {selectedFacility?.name}
                            </h2>
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                {selectedFacility ? (
                                    getCategoryIcon(selectedFacility.category)
                                ) : (
                                    <Box className="w-5 h-5" />
                                )}
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm mt-2 font-medium">
                            Mohon isi detail waktu peminjaman dan alasan
                            penggunaan dengan jelas.
                        </p>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={submitBooking} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <InputLabel
                                    htmlFor="start_time"
                                    value="Waktu Mulai"
                                    className="font-bold text-slate-700"
                                />
                                <TextInput
                                    id="start_time"
                                    type="datetime-local"
                                    className="mt-1 block w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.start_time}
                                    onChange={(e) =>
                                        setData("start_time", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.start_time}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="end_time"
                                    value="Waktu Selesai"
                                    className="font-bold text-slate-700"
                                />
                                <TextInput
                                    id="end_time"
                                    type="datetime-local"
                                    className="mt-1 block w-full rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.end_time}
                                    onChange={(e) =>
                                        setData("end_time", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.end_time}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <InputLabel
                                htmlFor="reason"
                                value="Alasan Peminjaman"
                                className="font-bold text-slate-700"
                            />
                            <textarea
                                id="reason"
                                className="mt-1 block w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm min-h-[100px] resize-y p-3"
                                placeholder="Jelaskan untuk keperluan apa fasilitas ini dipinjam..."
                                value={data.reason}
                                onChange={(e) =>
                                    setData("reason", e.target.value)
                                }
                                required
                            ></textarea>
                            <InputError
                                message={errors.reason}
                                className="mt-2"
                            />
                        </div>

                        {selectedFacility?.needs_kajur_approval ? (
                            <div className="mb-8 bg-amber-50 p-5 rounded-2xl border border-amber-200">
                                <InputLabel
                                    htmlFor="attachment"
                                    value="Surat Permohonan Peminjaman ke Kepala Jurusan (PDF/Image)"
                                    className="text-amber-900 font-extrabold flex items-center gap-2"
                                />
                                <p className="text-xs text-amber-700 mt-1 mb-4 font-medium flex items-start gap-1.5">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    Fasilitas ini memerlukan unggahan surat permohonan izin peminjaman resmi yang ditujukan kepada Kepala Jurusan.
                                </p>
                                <div className="bg-white p-2 rounded-xl border border-amber-100">
                                    <input
                                        type="file"
                                        id="attachment"
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 transition-colors cursor-pointer"
                                        onChange={(e) =>
                                            setData(
                                                "attachment",
                                                e.target.files[0],
                                            )
                                        }
                                        required
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </div>
                                <InputError
                                    message={errors.attachment}
                                    className="mt-2"
                                />
                            </div>
                        ) : null}

                        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={closeBookingModal}
                                className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Batal
                            </button>
                            <Button type="submit" variant="primary" size="lg"
                                disabled={processing}
                                className="rounded-xl px-8 py-3 bg-blue-700 hover:bg-blue-800 text-base"
                            >
                                Ajukan Peminjaman
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

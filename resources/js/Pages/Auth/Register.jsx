import Button from '@/Components/Button';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        npm: "",
        program_studi: "",
        email: "",
        nomor_telepon: "",
        password: "",
        password_confirmation: "",
        foto: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Baru" />

            <style>
                {`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            * { font-family: 'Plus Jakarta Sans', sans-serif !important; }`}
            </style>

            {/* Header Form - Dibuat Ramping */}
            <div className="mb-4 text-center">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Daftar Akun
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Lengkapi data diri untuk sistem SIMPEL.
                </p>
            </div>

            {/* Form Kontainer - Dibatasi lebarnya agar tidak melebar */}
            <form onSubmit={submit} className="space-y-4 max-w-md mx-auto">
                {/* Nama Lengkap */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nama Lengkap"
                        className="font-bold ml-1"
                    />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>

                {/* NPM & Nomor Telepon (Dibuat Berdampingan agar hemat ruang vertikal) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="npm"
                            value="NPM"
                            className="font-bold ml-1"
                        />
                        <TextInput
                            id="npm"
                            name="npm"
                            value={data.npm}
                            className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                            onChange={(e) => setData("npm", e.target.value)}
                            required
                        />
                        <InputError message={errors.npm} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="program_studi"
                            value="Program Studi"
                            className="font-bold ml-1"
                        />
                        <TextInput
                            id="program_studi"
                            name="program_studi"
                            value={data.program_studi}
                            className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                            onChange={(e) => setData("program_studi", e.target.value)}
                            placeholder="Contoh: D3 Teknik Komputer"
                            required
                        />
                        <InputError message={errors.program_studi} className="mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="nomor_telepon"
                            value="WhatsApp"
                            className="font-bold ml-1"
                        />
                        <TextInput
                            id="nomor_telepon"
                            name="nomor_telepon"
                            value={data.nomor_telepon}
                            className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                            onChange={(e) =>
                                setData("nomor_telepon", e.target.value)
                            }
                            placeholder="0812..."
                            required
                        />
                        <InputError
                            message={errors.nomor_telepon}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="font-bold ml-1"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Password & Konfirmasi (Berdekatan) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Kata Sandi"
                            className="font-bold ml-1"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi"
                            className="font-bold ml-1"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-xl border-slate-200 shadow-sm"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                    </div>
                </div>

                {/* Upload Foto - Full Width */}
                <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
                    <InputLabel
                        htmlFor="foto"
                        value="Foto Selfie (Bersama KTM)"
                        className="font-bold mb-2 block"
                    />
                    <input
                        id="foto"
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                        onChange={(e) => setData("foto", e.target.files[0])}
                        required
                    />
                    <InputError message={errors.foto} className="mt-1" />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg"
                        className="w-full justify-center py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all"
                        disabled={processing}
                    >
                        Daftar Akun
                    </Button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-4">
                    Sudah punya akun?{" "}
                    <Link
                        href={route("login")}
                        className="text-blue-600 font-bold hover:underline transition-colors"
                    >
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}

import Button from '@/Components/Button';
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        npm: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk Sistem" />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif !important; }
    `}</style>

            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Selamat Datang
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Gunakan akun Anda untuk masuk.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-bold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="npm" // Ganti id
                        value="Nomor Pokok Mahasiswa"
                        className="text-slate-700 font-bold ml-1"
                    />
                    <TextInput
                        id="npm" // Ganti id
                        type="text" // Ganti type ke text (karena NPM bukan email)
                        name="npm" // Ganti name
                        value={data.npm}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("npm", e.target.value)} // Ganti setData
                    />
                    <InputError message={errors.npm} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center ml-1">
                        <InputLabel
                            htmlFor="password"
                            value="Kata Sandi"
                            className="text-slate-700 font-bold"
                        />
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                            Ingat saya
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg">Masuk Sekarang</Button>
                </div>

                <p className="text-center text-sm text-slate-500">
                    Belum punya akun?{" "}
                    <Link
                        href={route("register")}
                        className="text-blue-600 font-bold hover:underline"
                    >
                        Daftar Baru
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}

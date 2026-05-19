<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
        'name' => 'required|string|max:255',
        'npm' => 'required|string|max:20|unique:users',
        'program_studi' => 'required|string|max:100',
        'email' => 'required|string|email|max:255|unique:users',
        'nomor_telepon' => 'required|string|max:15',
        'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Validasi foto [cite: 250]
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $path = $request->file('foto')->store('photos', 'public');

        $user = User::create([
        'name' => $request->name,
        'npm' => $request->npm,
        'program_studi' => $request->program_studi,
        'email' => $request->email,
        'nomor_telepon' => $request->nomor_telepon,
        'foto' => $path,
        'password' => Hash::make($request->password),
        'role' => 'mahasiswa',
        'status_aktif' => false,
    ]);

        event(new Registered($user));

        return redirect(route('login', absolute: false))->with('status', 'Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan Admin sebelum dapat digunakan untuk login.');
    }
}

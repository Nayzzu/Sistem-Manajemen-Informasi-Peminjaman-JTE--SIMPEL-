<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
{
    // Validasi input NPM
    $request->validate([
        'npm' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = \App\Models\User::where('npm', $request->npm)->first();

    if ($user && \Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
        if (!$user->status_aktif) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'npm' => 'Akun Anda belum disetujui atau sedang dinonaktifkan oleh Admin.',
            ]);
        }
    }

    // Coba login menggunakan NPM dan Password
    if (! Auth::attempt($request->only('npm', 'password'), $request->boolean('remember'))) {
        throw \Illuminate\Validation\ValidationException::withMessages([
            'npm' => __('auth.failed'), // Pesan jika NPM/Password salah
        ]);
    }

    $request->session()->regenerate();

    return redirect()->intended(route('dashboard', absolute: false));
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

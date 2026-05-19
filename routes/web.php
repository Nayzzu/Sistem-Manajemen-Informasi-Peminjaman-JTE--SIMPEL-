<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacilityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

use App\Http\Controllers\BookingController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Rute Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Rute Daftar Fasilitas (Tambahkan ini agar error hilang)
    Route::get('/facilities', [FacilityController::class, 'index'])->name('facilities.index');

    // Rute Simpan Booking
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

    // Rute Riwayat Pinjam (Opsional jika ada di Navbar)
    Route::get('/bookings/history', [BookingController::class, 'history'])->name('bookings.history');

    // Rute Verifikasi Admin (Hanya untuk Admin)
    Route::middleware(['admin'])->group(function () {
        Route::get('/admin/approvals', [\App\Http\Controllers\AdminController::class, 'approvals'])->name('admin.approvals');
        Route::get('/admin/export', [\App\Http\Controllers\AdminController::class, 'exportCsv'])->name('admin.export');
        Route::post('/admin/bookings/{booking}/status', [\App\Http\Controllers\AdminController::class, 'updateStatus'])->name('admin.bookings.update');
        
        // Rute Manajemen Pengguna
        Route::get('/admin/users', [\App\Http\Controllers\AdminController::class, 'users'])->name('admin.users');
        Route::post('/admin/users/{user}/role', [\App\Http\Controllers\AdminController::class, 'updateRole'])->name('admin.users.role');
        Route::post('/admin/users/{user}/status', [\App\Http\Controllers\AdminController::class, 'updateUserStatus'])->name('admin.users.status');
    });

    // Rute Daftar Peminjaman Aktif (Publik/All Users)
    Route::get('/active-bookings', [BookingController::class, 'activeList'])->name('bookings.activeList');
});



require __DIR__.'/auth.php';


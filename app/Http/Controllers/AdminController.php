<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function approvals()
    {
        // Ambil peminjaman yang masih pending
        $pendingBookings = \App\Models\Booking::with(['user', 'facility'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
            
        // Ambil peminjaman aktif (sedang berjalan)
        $activeBookings = \App\Models\Booking::with(['user', 'facility'])
            ->where('status', 'approved')
            ->where('end_time', '>=', now())
            ->orderBy('start_time', 'asc')
            ->get();

        return \Inertia\Inertia::render('Admin/Approvals', [
            'pendingBookings' => $pendingBookings,
            'activeBookings' => $activeBookings
        ]);
    }

    public function updateStatus(\Illuminate\Http\Request $request, \App\Models\Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,completed',
            'admin_notes' => 'nullable|string'
        ]);

        $updateData = [
            'status' => $request->status,
        ];

        if ($request->has('admin_notes')) {
            $updateData['admin_notes'] = $request->admin_notes;
        }

        if ($request->status === 'completed' && $booking->status !== 'completed') {
            $updateData['returned_at'] = now();
        }

        $booking->update($updateData);

        try {
            \Illuminate\Support\Facades\Mail::to($booking->user->email)->send(new \App\Mail\BookingStatusUpdated($booking));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Mail failed: ' . $e->getMessage());
        }

        return back()->with('success', 'Status peminjaman berhasil diperbarui.');
    }

    public function exportCsv()
    {
        $bookings = \App\Models\Booking::with(['user', 'facility'])->orderBy('created_at', 'desc')->get();

        $filename = "laporan_peminjaman_" . date('Y-m-d_H-i-s') . ".csv";
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID', 'Nama Peminjam', 'Fasilitas', 'Waktu Mulai', 'Waktu Selesai', 'Alasan', 'Status', 'Tanggal Pengajuan'];

        $callback = function() use($bookings, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($bookings as $booking) {
                fputcsv($file, [
                    $booking->id,
                    $booking->user->name,
                    $booking->facility->name,
                    $booking->start_time,
                    $booking->end_time,
                    $booking->reason,
                    $booking->status,
                    $booking->created_at
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function users()
    {
        $users = \App\Models\User::orderBy('created_at', 'desc')->get();
        return \Inertia\Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function updateRole(\Illuminate\Http\Request $request, \App\Models\User $user)
    {
        $request->validate(['role' => 'required|in:admin,mahasiswa']);
        $user->update(['role' => $request->role]);
        return back()->with('success', 'Peran pengguna berhasil diperbarui.');
    }

    public function updateUserStatus(\Illuminate\Http\Request $request, \App\Models\User $user)
    {
        $request->validate(['status_aktif' => 'required|boolean']);
        $user->update(['status_aktif' => $request->status_aktif]);
        return back()->with('success', 'Status pengguna berhasil diperbarui.');
    }
}

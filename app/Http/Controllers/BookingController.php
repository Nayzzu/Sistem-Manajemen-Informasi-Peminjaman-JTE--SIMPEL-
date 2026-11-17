<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Facility;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->user()->status_aktif) {
            return back()->withErrors(['start_time' => 'Akun Anda dinonaktifkan. Silakan hubungi admin.'])->withInput();
        }

        $request->validate([
            'facility_id' => 'required|exists:facilities,id',
            'start_time' => 'required|date|after_or_equal:now',
            'end_time' => 'required|date|after:start_time',
            'reason' => 'required|string|max:500',
        ], [
            'start_time.after_or_equal' => 'Waktu mulai tidak boleh di masa lalu.',
            'end_time.after' => 'Waktu selesai harus setelah waktu mulai.',
        ]);

        $facility = Facility::findOrFail($request->facility_id);

        if (!$facility->is_available) {
            return back()->withErrors(['start_time' => 'Fasilitas ini sedang tidak tersedia untuk dipinjam.'])->withInput();
        }

        $request->validate([
            'attachment' => [
                $facility->needs_kajur_approval ? 'required' : 'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:2048',
            ],
        ], [
            'attachment.required' => 'Surat permohonan ke Kepala Jurusan wajib dilampirkan untuk fasilitas ini.',
        ]);

        $startTime = Carbon::parse($request->start_time);
        $endTime = Carbon::parse($request->end_time);

        // Cek konflik peminjaman (mencegah double booking)
        $conflict = Booking::where('facility_id', $facility->id)
            ->whereIn('status', ['approved', 'pending'])
            ->where('start_time', '<', $endTime)
            ->where('end_time', '>', $startTime)
            ->exists();

        if ($conflict) {
            return back()->withErrors(['start_time' => 'Fasilitas sudah dipesan atau sedang diajukan pada rentang waktu tersebut.'])->withInput();
        }

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('attachments', 'public');
        }

        Booking::create([
            'user_id' => auth()->id(),
            'facility_id' => $facility->id,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'reason' => $request->reason,
            'status' => 'pending', // Default status
            'attachment' => $attachmentPath,
        ]);

        return redirect()->route('bookings.history')->with('success', 'Booking berhasil diajukan dan menunggu persetujuan.');
    }

    public function history()
    {
        $user = auth()->user();

        $query = Booking::with('facility')->latest();

        // Jika bukan admin, hanya bisa melihat booking miliknya
        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $bookings = $query->get();

        return Inertia::render('Bookings/History', [
            'bookings' => $bookings,
        ]);
    }

    public function activeList()
    {
        $activeBookings = Booking::with(['user', 'facility'])
            ->where('status', 'approved')
            ->where('end_time', '>=', now())
            ->orderBy('start_time', 'asc')
            ->get();

        return Inertia::render('Bookings/Active', [
            'activeBookings' => $activeBookings,
        ]);
    }
}

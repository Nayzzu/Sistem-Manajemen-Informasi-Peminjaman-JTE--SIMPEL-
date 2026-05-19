<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->user()->status_aktif) {
            return back()->withErrors(['start_time' => 'Akun Anda dinonaktifkan. Silakan hubungi admin.'])->withInput();
        }

        $facility = \App\Models\Facility::findOrFail($request->facility_id);

        $request->validate([
            'facility_id' => 'required|exists:facilities,id',
            'start_time' => 'required|date|after_or_equal:today',
            'end_time' => 'required|date|after:start_time',
            'reason' => 'required|string|max:500',
            'attachment' => [
                $facility->needs_kajur_approval ? 'required' : 'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:2048'
            ],
        ], [
            'attachment.required' => 'Surat permohonan ke Kepala Jurusan wajib dilampirkan untuk fasilitas ini.',
            'start_time.after_or_equal' => 'Waktu mulai tidak boleh di masa lalu.',
            'end_time.after' => 'Waktu selesai harus setelah waktu mulai.'
        ]);

        // Cek konflik peminjaman (mencegah double booking)
        $conflict = \App\Models\Booking::where('facility_id', $request->facility_id)
            ->whereIn('status', ['approved', 'pending'])
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                      ->orWhere(function ($q) use ($request) {
                          $q->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                      });
            })->exists();

        if ($conflict) {
            return back()->withErrors(['start_time' => 'Fasilitas sudah dipesan atau sedang diajukan pada rentang waktu tersebut.'])->withInput();
        }

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('attachments', 'public');
        }

        \App\Models\Booking::create([
            'user_id' => auth()->id(),
            'facility_id' => $request->facility_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'reason' => $request->reason,
            'status' => 'pending', // Default status
            'attachment' => $attachmentPath,
        ]);

        return redirect()->route('bookings.history')->with('success', 'Booking berhasil diajukan dan menunggu persetujuan.');
    }

    public function history()
    {
        $user = auth()->user();
        
        $query = \App\Models\Booking::with('facility')->latest();

        // Jika bukan admin, hanya bisa melihat booking miliknya
        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $bookings = $query->get();

        return \Inertia\Inertia::render('Bookings/History', [
            'bookings' => $bookings
        ]);
    }

    public function activeList()
    {
        $activeBookings = \App\Models\Booking::with(['user', 'facility'])
            ->where('status', 'approved')
            ->where('end_time', '>=', now())
            ->orderBy('start_time', 'asc')
            ->get();

        return \Inertia\Inertia::render('Bookings/Active', [
            'activeBookings' => $activeBookings
        ]);
    }
}

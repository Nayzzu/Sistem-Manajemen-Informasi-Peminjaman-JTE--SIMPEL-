<!DOCTYPE html>
<html>
<head>
    <title>Pembaruan Status Peminjaman</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-w-2xl mx-auto p-4 border border-gray-200 rounded-lg shadow-sm">
        <h2 style="color: #2563eb;">Halo, {{ $booking->user->name }}</h2>
        <p>Status permohonan peminjaman fasilitas Anda untuk <strong>{{ $booking->facility->name }}</strong> telah diperbarui oleh Admin.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p>Status saat ini: <strong style="color: {{ $booking->status == 'approved' ? '#16a34a' : ($booking->status == 'rejected' ? '#dc2626' : '#2563eb') }}">{{ strtoupper($booking->status) }}</strong></p>
            <p>Waktu Mulai: <strong>{{ \Carbon\Carbon::parse($booking->start_time)->format('d M Y, H:i') }}</strong></p>
            <p>Waktu Selesai: <strong>{{ \Carbon\Carbon::parse($booking->end_time)->format('d M Y, H:i') }}</strong></p>
        </div>

        <p>Anda dapat melihat detail lebih lanjut di dalam dashboard sistem peminjaman.</p>
        <p>Terima kasih,<br>Tim Admin Fasilitas Teknik Elektro</p>
    </div>
</body>
</html>

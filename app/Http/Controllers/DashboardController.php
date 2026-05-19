<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Facility;
use App\Models\Booking;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $pendingApprovals = Booking::where('status', 'pending')->count();
        $activeBookings = Booking::where('status', 'approved')
            ->where('end_time', '>=', now())
            ->count();
            
        $userBookings = Booking::where('user_id', $user->id)->count();
        $approvedBookings = Booking::where('user_id', $user->id)->where('status', 'approved')->count();
        $pendingBookings = Booking::where('user_id', $user->id)->where('status', 'pending')->count();

        // Ambil aktivitas terbaru
        $recentActivitiesQuery = Booking::with(['user', 'facility'])->latest()->take(5);
        if ($user->role !== 'admin') {
            $recentActivitiesQuery->where('user_id', $user->id);
        }
        $recentActivities = $recentActivitiesQuery->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_facilities' => Facility::count(),
                'pending_approvals' => $pendingApprovals,
                'active_bookings' => $activeBookings,
                'user_bookings' => $userBookings,
                'approved_bookings' => $approvedBookings,
                'pending_bookings' => $pendingBookings,
            ],
            'recent_activities' => $recentActivities
        ]);
    }
}
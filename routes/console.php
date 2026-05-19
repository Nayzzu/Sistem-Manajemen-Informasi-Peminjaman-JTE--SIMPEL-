<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

use Illuminate\Support\Facades\Schedule;
use App\Models\Booking;

Schedule::call(function () {
    Booking::where('status', 'approved')
        ->where('end_time', '<=', now())
        ->update(['status' => 'completed']);
})->everyMinute();

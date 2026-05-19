<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Facility;

class WelcomeController extends Controller
{
    public function index()
    {
        // Ambil 3 fasilitas terbaru/teratas untuk ditampilkan di landing page
        $facilities = Facility::latest()->take(3)->get();
        
        return Inertia::render('Welcome', [
            'facilities' => $facilities
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        return Inertia::render('Facilities/Index', [
            'facilities' => Facility::all(),
        ]);
    }
}
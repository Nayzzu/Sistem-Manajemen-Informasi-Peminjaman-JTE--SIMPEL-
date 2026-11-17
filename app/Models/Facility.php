<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facility extends Model
{
    use SoftDeletes; // 

    protected $fillable = [
        'name',
        'category',
        'description',
        'capacity',
        'needs_kajur_approval',
        'is_available',
    ];

    protected function casts(): array
    {
        return [
            'needs_kajur_approval' => 'boolean',
            'is_available' => 'boolean',
        ];
    }
}
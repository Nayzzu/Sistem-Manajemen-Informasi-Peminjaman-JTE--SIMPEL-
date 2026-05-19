<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Facility;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        $facilities = [
            [
                'name' => 'Laboratorium Komputer',
                'category' => 'laboratorium',
                'description' => 'Fasilitas komputer spek tinggi untuk praktikum.',
                'needs_kajur_approval' => true, // Perlu izin Kajur
                'is_available' => true,
            ],
            [
                'name' => 'Proyektor Epson EB-X100',
                'category' => 'inventaris',
                'description' => 'Proyektor portabel untuk presentasi kelas.',
                'needs_kajur_approval' => false, // Cukup izin Admin
                'is_available' => true,
            ],
            [
                'name' => 'Ruang H5 LT 3',
                'category' => 'ruangan',
                'description' => 'Ruang kelas kapasitas 40 orang.',
                'needs_kajur_approval' => false,
                'is_available' => true,
            ],
            [
                'name' => 'Ruang H18 Lantai 1',
                'category' => 'ruangan',
                'description' => 'Ruang kelas H18 Lantai 1.',
                'needs_kajur_approval' => true,
                'is_available' => true,
            ],
            [
                'name' => 'Ruang H20 Lantai 1',
                'category' => 'ruangan',
                'description' => 'Ruang kelas H20 Lantai 1.',
                'needs_kajur_approval' => true,
                'is_available' => true,
            ],
            [
                'name' => 'Meja Ruang Kajur',
                'category' => 'inventaris',
                'description' => 'Meja yang berada di ruang Kajur.',
                'needs_kajur_approval' => true,
                'is_available' => true,
            ],
            [
                'name' => 'Sofa Ruang Kajur',
                'category' => 'inventaris',
                'description' => 'Sofa yang berada di ruang Kajur.',
                'needs_kajur_approval' => true,
                'is_available' => true,
            ],
        ];

        foreach ($facilities as $facility) {
            Facility::create($facility);
        }
    }
}
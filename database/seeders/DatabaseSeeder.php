<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['npm' => 'admin'],
            [
                'name' => 'Admin JTE',
                'program_studi' => 'Teknik Elektro',
                'email' => 'admin@simpel.test',
                'nomor_telepon' => '081200000000',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status_aktif' => true,
            ]
        );

        User::firstOrCreate(
            ['npm' => '2215061001'],
            [
                'name' => 'Mahasiswa Demo',
                'program_studi' => 'Teknik Elektro',
                'email' => 'mahasiswa@simpel.test',
                'nomor_telepon' => '081200000001',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
                'status_aktif' => true,
            ]
        );

        $this->call([
            FacilitySeeder::class,
        ]);
    }
}

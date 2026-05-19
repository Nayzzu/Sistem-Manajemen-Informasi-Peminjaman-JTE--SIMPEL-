<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

#[Fillable(['name', 'email', 'password', 'npm', 'program_studi', 'nomor_telepon', 'role', 'status_aktif'])] // Tambahkan atribut baru di sini [cite: 56, 70]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Fungsi pembantu untuk cek role di Dashboard
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}

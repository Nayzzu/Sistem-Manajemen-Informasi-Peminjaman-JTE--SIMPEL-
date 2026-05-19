<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('npm')->unique()->after('name'); // NPM unik sebagai identitas utama [cite: 52, 53]
        $table->string('nomor_telepon')->nullable()->after('email'); // Nomor telepon user [cite: 68]
        $table->enum('role', ['admin', 'mahasiswa'])->default('mahasiswa')->after('password'); // Pembeda akses [cite: 68]
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn(['npm', 'nomor_telepon', 'role']);
    });
    }
};

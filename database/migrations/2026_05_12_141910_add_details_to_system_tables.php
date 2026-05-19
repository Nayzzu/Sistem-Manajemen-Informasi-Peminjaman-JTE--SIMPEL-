<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('facilities', function (Blueprint $table) {
            $table->integer('capacity')->nullable()->after('description');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->text('admin_notes')->nullable()->after('status');
            $table->timestamp('returned_at')->nullable()->after('end_time');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('program_studi')->nullable()->after('npm');
            $table->boolean('status_aktif')->default(true)->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('facilities', function (Blueprint $table) {
            $table->dropColumn('capacity');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['admin_notes', 'returned_at']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['program_studi', 'status_aktif']);
        });
    }
};

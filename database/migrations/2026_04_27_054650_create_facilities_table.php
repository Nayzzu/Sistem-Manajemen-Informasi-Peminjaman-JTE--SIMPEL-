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
    Schema::create('facilities', function (Blueprint $table) {
        $table->id();
        $table->string('name'); 
        // Menggunakan kategori yang kita sepakati [cite: 195, 197]
        $table->enum('category', ['ruangan', 'laboratorium', 'inventaris']); 
        $table->text('description')->nullable();
        
        // Logika Level Persetujuan [cite: 184, 185]
        // false = cukup Admin (inventaris), true = butuh Kajur (laboratorium)
        $table->boolean('needs_kajur_approval')->default(false); 
        
        $table->boolean('is_available')->default(true);
        $table->timestamps();
        $table->softDeletes(); //  Agar data tidak benar-benar hilang saat dihapus
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};

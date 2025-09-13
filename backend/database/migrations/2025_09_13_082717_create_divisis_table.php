<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('divisis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_divisi')->unique();
            $table->string('singkatan_divisi')->nullable();
            $table->string('judul_deskripsi')->nullable();
            $table->text('deskripsi')->nullable();
            $table->text('pengertian')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('divisis');
    }
};

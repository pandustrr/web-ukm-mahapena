<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    use HasFactory;

    protected $fillable = [
        'periode_id',
        'nama_divisi',
        'singkatan_divisi',
        'judul_deskripsi',
        'deskripsi',
        'pengertian',
    ];

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }
}

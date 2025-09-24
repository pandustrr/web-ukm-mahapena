<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengurus extends Model
{
    use HasFactory;

    protected $table = 'pengurus';


    protected $fillable = [
        'divisi_id',
        'periode_id',
        'nama',
        'jabatan',
        'prodi',
        'angkatan',
        'foto',
    ];

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }
}

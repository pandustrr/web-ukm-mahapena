<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    use HasFactory;

    protected $fillable = ['nama_periode'];

    public function pengurus()
    {
        return $this->hasMany(Pengurus::class, 'periode_id');
    }

    public function divisis()
    {
        return $this->hasMany(Divisi::class, 'periode_id');
    }
}

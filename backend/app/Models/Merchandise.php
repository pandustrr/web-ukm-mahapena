<?php

// app/Models/Merchandise.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchandise extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'price',
        'stock',
        'description',
        'sizes',
        'colors',
        'image'
    ];

    protected $casts = [
        'sizes' => 'array',
        'colors' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(CategoryMerchandise::class, 'category_id');
    }
}

<?php

// CategoryMerchandise.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryMerchandise extends Model
{
    use HasFactory;

    protected $table = 'category_merchandises';
    protected $fillable = ['name'];

    public function merchandises()
    {
        return $this->hasMany(Merchandise::class, 'category_id');
    }
}

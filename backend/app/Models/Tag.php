<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name', 'slug'];

    // Relasi ke Blog (many-to-many)
    public function blogs()
    {
        return $this->belongsToMany(Blog::class, 'blog_tag');
    }
}

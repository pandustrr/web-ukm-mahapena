<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'category_id',
        'status',
        'featured_image',
        'meta_title',
        'meta_description',
        'views',
        'published_at'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'blog_tag');
    }
}

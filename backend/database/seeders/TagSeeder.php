<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = ['Laravel', 'React', 'Vue', 'PHP', 'JavaScript'];
        foreach ($tags as $t) {
            Tag::firstOrCreate(['slug' => Str::slug($t)], ['name' => $t]);
        }
    }
}

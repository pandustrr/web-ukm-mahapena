<?php

namespace App\Http\Controllers;

use App\Models\Merchandise;
use App\Models\CategoryMerchandise; // pastikan model ini ada
use Illuminate\Http\Request;

class PublicMerchandiseController extends Controller
{
    public function index()
    {
        return response()->json(
            Merchandise::with('category')->get()
        );
    }

    public function categories()
    {
        return response()->json(
            CategoryMerchandise::select('id', 'name')->get()
        );
    }
}

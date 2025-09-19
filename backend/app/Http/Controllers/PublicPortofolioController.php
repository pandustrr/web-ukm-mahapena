<?php

namespace App\Http\Controllers;

use App\Models\Portofolio;

class PublicPortofolioController extends Controller
{
    // Ambil semua portofolio (untuk ditampilkan di frontend)
    public function index()
    {
        return response()->json(Portofolio::all(), 200);
    }

    // Detail portofolio
    public function show($id)
    {
        $portofolio = Portofolio::findOrFail($id);
        return response()->json($portofolio);
    }
}

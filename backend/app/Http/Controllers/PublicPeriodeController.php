<?php

namespace App\Http\Controllers;

use App\Models\Periode;
use Illuminate\Http\Request;

class PublicPeriodeController extends Controller
{
    // Ambil semua periode untuk publik (dropdown)
    public function all()
    {
        $periodes = Periode::all(['id', 'nama_periode']);
        return response()->json($periodes);
    }
}

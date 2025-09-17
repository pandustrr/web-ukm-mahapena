<?php

namespace App\Http\Controllers;

use App\Models\Divisi;

class PublicDivisiController extends Controller
{
    // Ambil semua divisi untuk publik
    public function index()
    {
        return response()->json(
            Divisi::select(
                'id',
                'nama_divisi as nama',
                'singkatan_divisi as singkatan',
                'judul_deskripsi',
                'deskripsi',
                'pengertian'
            )->get()
        );
    }

    // Ambil divisi berdasarkan periode untuk publik
    public function byPeriode($periodeId)
    {
        $divisis = Divisi::where('periode_id', $periodeId)
            ->get(['id', 'nama_divisi as nama']);
        return response()->json($divisis);
    }
}

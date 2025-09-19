<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use Illuminate\Http\Request;

class PublicPengurusController extends Controller
{
    // Ambil pengurus publik, filter berdasarkan periode & divisi
    public function index(Request $request)
    {
        $query = Pengurus::query();

        if ($request->periode_id) {
            $query->where('periode_id', $request->periode_id);
        }
        if ($request->divisi_id) {
            $query->where('divisi_id', $request->divisi_id);
        }

        // optional: ambil relasi divisi
        $pengurus = $query->with('divisi')->get(['id', 'nama', 'jabatan', 'divisi_id', 'prodi', 'angkatan', 'foto']);
        return response()->json($pengurus);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Alumni;

class PublicAlumniController extends Controller
{
    // Tampilkan semua alumni
    public function index()
    {
        return response()->json(Alumni::all());
    }

    // Tampilkan detail 1 alumni
    public function show($id)
    {
        return response()->json(Alumni::findOrFail($id));
    }
}

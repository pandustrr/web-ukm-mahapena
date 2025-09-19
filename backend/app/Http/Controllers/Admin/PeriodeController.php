<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Periode;
use App\Models\Admin;

class PeriodeController extends Controller
{
    private function checkToken(Request $request)
    {
        $token = $request->header('Authorization');
        if (!$token || !Admin::where('api_token', str_replace('Bearer ', '', $token))->exists()) {
            return false;
        }
        return true;
    }

    // Ambil semua periode
    public function index(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message'=>'Unauthorized'],401);
        }

        return response()->json(Periode::all());
    }

    // Ambil periode beserta pengurusnya
    public function withPengurus(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message'=>'Unauthorized'],401);
        }

        // eager load pengurus + divisi
        $periodes = Periode::with(['pengurus.divisi'])->get();
        return response()->json($periodes);
    }

    public function store(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message'=>'Unauthorized'],401);
        }

        $request->validate([
            'nama_periode'=>'required|string|unique:periodes,nama_periode'
        ]);

        return response()->json(Periode::create($request->all()),201);
    }

    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message'=>'Unauthorized'],401);
        }

        $periode = Periode::find($id);
        if (!$periode) return response()->json(['message'=>'Not Found'],404);

        $request->validate([
            'nama_periode'=>'required|string|unique:periodes,nama_periode,'.$id
        ]);

        $periode->update($request->all());
        return response()->json($periode);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message'=>'Unauthorized'],401);
        }

        $periode = Periode::find($id);
        if (!$periode) return response()->json(['message'=>'Not Found'],404);

        $periode->delete();
        return response()->json(['message'=>'Deleted successfully']);
    }
}

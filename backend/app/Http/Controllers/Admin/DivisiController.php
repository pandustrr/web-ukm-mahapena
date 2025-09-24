<?php

// app/Http/Controllers/Admin/DivisiController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Divisi;
use App\Models\Admin;

class DivisiController extends Controller
{
    private function checkToken(Request $request)
    {
        $token = $request->header('Authorization');
        return $token && Admin::where('api_token', str_replace('Bearer ', '', $token))->exists();
    }

    public function index(Request $request)
    {
        if (!$this->checkToken($request)) return response()->json(['message' => 'Unauthorized'], 401);

        $divisis = Divisi::with('periode')->get(); // ✅ ikut periode
        return response()->json($divisis);
    }

    public function store(Request $request)
    {
        if (!$this->checkToken($request)) return response()->json(['message' => 'Unauthorized'], 401);

        $request->validate([
            'periode_id' => 'required|exists:periodes,id',
            'nama_divisi' => 'required|string|unique:divisis,nama_divisi',
        ]);

        $divisi = Divisi::create($request->all());
        return response()->json($divisi, 201);
    }

    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) return response()->json(['message' => 'Unauthorized'], 401);

        $divisi = Divisi::find($id);
        if (!$divisi) return response()->json(['message' => 'Not Found'], 404);

        $request->validate([
            'periode_id' => 'required|exists:periodes,id',
            'nama_divisi' => 'required|string|unique:divisis,nama_divisi,' . $id,
        ]);

        $divisi->update($request->all());
        return response()->json($divisi);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) return response()->json(['message' => 'Unauthorized'], 401);

        $divisi = Divisi::find($id);
        if (!$divisi) return response()->json(['message' => 'Not Found'], 404);

        $divisi->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    public function byPeriode(Request $request, $periodeId)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $divisis = Divisi::where('periode_id', $periodeId)->get();
            return response()->json($divisis);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal ambil divisi',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}

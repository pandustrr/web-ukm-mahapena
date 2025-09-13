<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Divisi;
use App\Models\Admin;

class DivisiController extends Controller
{
    // Cek token
    private function checkToken(Request $request)
    {
        $token = $request->header('Authorization');
        if (!$token || !Admin::where('api_token', str_replace('Bearer ', '', $token))->exists()) {
            return false;
        }
        return true;
    }

    // List semua divisi
    public function index(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(Divisi::all());
    }

    // Tambah divisi
    public function store(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validator = Validator::make($request->all(), [
            'nama_divisi' => 'required|string|unique:divisis,nama_divisi',
            'singkatan_divisi' => 'nullable|string',
            'judul_deskripsi' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'pengertian' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $divisi = Divisi::create($request->all());
        return response()->json($divisi, 201);
    }

    // Update divisi
    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $divisi = Divisi::find($id);
        if (!$divisi) return response()->json(['message' => 'Not Found'], 404);

        $validator = Validator::make($request->all(), [
            'nama_divisi' => 'required|string|unique:divisis,nama_divisi,' . $id,
            'singkatan_divisi' => 'nullable|string',
            'judul_deskripsi' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'pengertian' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $divisi->update($request->all());
        return response()->json($divisi);
    }

    // Hapus divisi
    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $divisi = Divisi::find($id);
        if (!$divisi) return response()->json(['message' => 'Not Found'], 404);

        $divisi->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

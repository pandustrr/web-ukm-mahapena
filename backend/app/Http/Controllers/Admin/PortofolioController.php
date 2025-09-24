<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portofolio;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortofolioController extends Controller
{
    // 🔑 Cek Token Admin
    private function checkToken(Request $request)
    {
        $token = $request->header('Authorization');
        if (!$token || !Admin::where('api_token', str_replace('Bearer ', '', $token))->exists()) {
            return false;
        }
        return true;
    }

    // Ambil semua portofolio
    public function index(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(Portofolio::all(), 200);
    }

    // Simpan portofolio baru
    public function store(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tahun' => 'nullable|string|max:10',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('portofolio', 'public');
        }

        $portofolio = Portofolio::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'gambar' => $gambarPath,
        ]);

        return response()->json($portofolio, 201);
    }

    // Detail portofolio
    public function show(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $portofolio = Portofolio::findOrFail($id);
        return response()->json($portofolio);
    }

    // Update portofolio
    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $portofolio = Portofolio::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tahun' => 'nullable|string|max:10',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($portofolio->gambar && Storage::disk('public')->exists($portofolio->gambar)) {
                Storage::disk('public')->delete($portofolio->gambar);
            }
            $gambarPath = $request->file('gambar')->store('portofolio', 'public');
            $portofolio->gambar = $gambarPath;
        }

        $portofolio->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'gambar' => $portofolio->gambar,
        ]);

        return response()->json($portofolio);
    }

    // Hapus portofolio
    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $portofolio = Portofolio::findOrFail($id);

        if ($portofolio->gambar && Storage::disk('public')->exists($portofolio->gambar)) {
            Storage::disk('public')->delete($portofolio->gambar);
        }

        $portofolio->delete();

        return response()->json(['message' => 'Portofolio berhasil dihapus']);
    }
}

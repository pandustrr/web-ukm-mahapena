<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Pengurus;
use App\Models\Admin;

class PengurusController extends Controller
{
    private function checkToken(Request $request)
    {
        $token = $request->header('Authorization');
        if (!$token || !Admin::where('api_token', str_replace('Bearer ', '', $token))->exists()) {
            return false;
        }
        return true;
    }

    public function index(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(
            Pengurus::with(['divisi', 'periode'])->get()
        );
    }

    public function store(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'divisi_id' => 'required|exists:divisis,id',
            'periode_id' => 'nullable|exists:periodes,id',
            'nama' => 'required|string',
            'jabatan' => 'required|string',
            'prodi' => 'required|string',
            'angkatan' => 'required|string',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->only([
            'divisi_id', 'periode_id', 'nama', 'jabatan', 'prodi', 'angkatan'
        ]);

        if ($request->hasFile('foto')) {
            $fileName = time() . '_' . $request->file('foto')->getClientOriginalName();
            $path = $request->file('foto')->storeAs('foto_pengurus', $fileName, 'public');
            $data['foto'] = $path;
        }

        $pengurus = Pengurus::create($data);

        return response()->json($pengurus, 201);
    }

    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $pengurus = Pengurus::find($id);
        if (!$pengurus) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $request->validate([
            'divisi_id' => 'required|exists:divisis,id',
            'periode_id' => 'nullable|exists:periodes,id',
            'nama' => 'required|string',
            'jabatan' => 'required|string',
            'prodi' => 'required|string',
            'angkatan' => 'required|string',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->only([
            'divisi_id', 'periode_id', 'nama', 'jabatan', 'prodi', 'angkatan'
        ]);

        if ($request->hasFile('foto')) {
            // hapus foto lama kalau ada
            if ($pengurus->foto && Storage::disk('public')->exists($pengurus->foto)) {
                Storage::disk('public')->delete($pengurus->foto);
            }

            $fileName = time() . '_' . $request->file('foto')->getClientOriginalName();
            $path = $request->file('foto')->storeAs('foto_pengurus', $fileName, 'public');
            $data['foto'] = $path;
        }

        $pengurus->update($data);

        return response()->json($pengurus);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $pengurus = Pengurus::find($id);
        if (!$pengurus) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        // hapus foto juga biar storage tidak penuh
        if ($pengurus->foto && Storage::disk('public')->exists($pengurus->foto)) {
            Storage::disk('public')->delete($pengurus->foto);
        }

        $pengurus->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}

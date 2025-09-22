<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProkerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Proker::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'nullable|date',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'in:pending,berjalan,selesai',
        ]);

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('proker-images', 'public');
            $validated['featured_image'] = $path;
        }

        $proker = Proker::create($validated);

        return response()->json([
            'message' => 'Proker berhasil ditambah',
            'data' => $proker,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Proker $proker)
    {
        return response()->json($proker);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proker $proker)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'nullable|date',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'in:pending,berjalan,selesai',
        ]);

        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($proker->featured_image) {
                Storage::disk('public')->delete($proker->featured_image);
            }

            $path = $request->file('featured_image')->store('proker-images', 'public');
            $validated['featured_image'] = $path;
        }

        $proker->update($validated);

        return response()->json([
            'message' => 'Proker berhasil diperbarui',
            'data' => $proker,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $proker->delete();
        // return response()->json(null, 204);\
        try {
            $proker = Proker::findOrFail($id);
            if ($proker->featured_image) {
                Storage::disk('public')->delete($proker->featured_image);
            }
            $proker->delete();

            return response()->json([
                'message' => 'Proker berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus proker',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

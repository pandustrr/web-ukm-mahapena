<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CategoryMerchandise;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;

class CategoryMerchandiseController extends Controller
{
    // ==============================
    // Helper: Cek token manual
    // ==============================
    private function checkToken(Request $request)
    {
        $token = $request->header('Authorization');
        if (!$token || !Admin::where('api_token', str_replace('Bearer ', '', $token))->exists()) {
            return false;
        }
        return true;
    }

    // List semua kategori
    public function index(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $categories = CategoryMerchandise::all();
        return response()->json($categories);
    }

    // Tambah kategori baru
    public function store(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:category_merchandises,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = new CategoryMerchandise();
        $category->name = $request->name;
        $category->save();

        return response()->json($category, 201);
    }

    // Update kategori
    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $category = CategoryMerchandise::find($id);
        if (!$category) return response()->json(['message' => 'Not Found'], 404);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:category_merchandises,name,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category->name = $request->name;
        $category->save();

        return response()->json($category);
    }

    // Hapus kategori
    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $category = CategoryMerchandise::find($id);
        if (!$category) return response()->json(['message' => 'Not Found'], 404);

        // Optional: hapus semua merchandise di kategori ini
        // $category->merchandises()->delete();

        $category->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

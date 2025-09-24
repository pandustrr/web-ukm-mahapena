<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumni;
use App\Models\Admin;

class AlumniController extends Controller
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
        return response()->json(Alumni::all());
    }

    public function store(Request $request)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $data = $request->all();
        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('alumni', 'public');
            $data['foto'] = $path;
        }

        $alumni = Alumni::create($data);

        return response()->json([
            'message' => 'Alumni berhasil ditambahkan',
            'alumni' => $alumni
        ]);
    }

    public function show(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json(Alumni::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $alumni = Alumni::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('alumni', 'public');
            $data['foto'] = $path;
        }

        $alumni->update($data);

        return response()->json([
            'message' => 'Alumni berhasil diperbarui',
            'alumni' => $alumni
        ]);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->checkToken($request)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Alumni::findOrFail($id)->delete();
        return response()->json(['message' => 'Alumni berhasil dihapus']);
    }
}

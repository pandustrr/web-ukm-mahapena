<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // login admin
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Username atau password salah'], 401);
        }

        // Generate token sementara
        $token = Str::random(60);
        // Simpan token di kolom baru "api_token" di tabel admins
        $admin->api_token = $token;
        $admin->save();

        return response()->json(['token' => $token]);
    }

    // logout admin
    public function logout(Request $request)
    {
        $token = $request->header('Authorization');
        if ($token) {
            $admin = Admin::where('api_token', $token)->first();
            if ($admin) {
                $admin->api_token = null;
                $admin->save();
            }
        }
        return response()->json(['message' => 'Logout berhasil']);
    }

    // dashboard admin
    public function dashboard(Request $request)
    {
        $token = $request->header('Authorization');
        if (!$token || !Admin::where('api_token', $token)->exists()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'Selamat datang di dashboard admin']);
    }
}

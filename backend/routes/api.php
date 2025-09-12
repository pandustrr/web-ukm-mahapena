<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Admin\MerchandiseController;
use App\Http\Controllers\Admin\CategoryMerchandiseController;
use App\Http\Controllers\PublicMerchandiseController;


// =====================
// POST Routes
// =====================
Route::apiResource('posts', PostController::class);

// =====================
// Blog Routes
// =====================
Route::apiResource('blogs', BlogController::class);
Route::get('public/blogs', [BlogController::class, 'indexPublic']);
Route::get('public/blogs/{slug}', [BlogController::class, 'showPublic']);

// =====================
// User info
// =====================
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// =====================
// Admin Routes (auth required)
// =====================
Route::prefix('admin')->group(function () {
    // Merchandise CRUD manual
    Route::get('merchandises', [MerchandiseController::class, 'index']);
    Route::post('merchandises', [MerchandiseController::class, 'store']);
    Route::put('merchandises/{id}', [MerchandiseController::class, 'update']);
    Route::delete('merchandises/{id}', [MerchandiseController::class, 'destroy']);
    Route::post('merchandises/{id}/image', [MerchandiseController::class, 'updateImage']);
    // Route::post('/admin/merchandise/{id}/decrease-stock', [MerchandiseController::class, 'decreaseStock']);

    // Category Merchandise CRUD manual
    Route::get('categories', [CategoryMerchandiseController::class, 'index']);
    Route::post('categories', [CategoryMerchandiseController::class, 'store']);
    Route::put('categories/{id}', [CategoryMerchandiseController::class, 'update']);
    Route::delete('categories/{id}', [CategoryMerchandiseController::class, 'destroy']);
});

// =====================
// Public Merchandise Routes
// =====================
Route::get('/merchandises', [PublicMerchandiseController::class, 'index']);
Route::get('/categories', [PublicMerchandiseController::class, 'categories']);

// =====================
// Public Blog Routes
// =====================
Route::get('public/blogs', [BlogController::class, 'indexPublic']);
Route::get('public/blogs/{slug}', [BlogController::class, 'showPublic']);
Route::post('/merchandise/{id}/decrease-stock-public', [App\Http\Controllers\Admin\MerchandiseController::class, 'decreaseStockPublic']);

// =====================
// Admin (login/logout)
// =====================
Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\BlogController;

Route::apiResource('posts', PostController::class);

Route::apiResource('blogs', BlogController::class);
Route::get('public/blogs', [BlogController::class, 'indexPublic']);
Route::get('public/blogs/{slug}', [BlogController::class, 'showPublic']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    // Blog Management Routes
    Route::post('blogs/{id}/publish', [BlogController::class, 'publish']);
    Route::post('blogs/{id}/unpublish', [BlogController::class, 'unpublish']);
    Route::get('my-blogs', [BlogController::class, 'myBlogs']);
});

// Public routes
Route::get('public/blogs', [BlogController::class, 'indexPublic']);
Route::get('public/blogs/{slug}', [BlogController::class, 'showPublic']);

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [AuthController::class, 'dashboard']);
});

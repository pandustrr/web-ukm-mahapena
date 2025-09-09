<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->routes(function () {
            // Semua route di routes/api.php akan otomatis pakai prefix /api
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Semua route di routes/web.php jalan tanpa prefix
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}

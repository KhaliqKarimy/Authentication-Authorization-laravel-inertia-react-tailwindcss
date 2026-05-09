<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocaleMiddleware {
    public function handle(Request $request, Closure $next): Response {
        $locale = $request->get('lang')
            ?? session('lang')
            ?? config('app.locale');

        if (in_array($locale, ['en', 'fa', 'pa'])) {
            app()->setLocale($locale);
            session(['lang' => $locale]);
        }

        return $next($request);
    }
}

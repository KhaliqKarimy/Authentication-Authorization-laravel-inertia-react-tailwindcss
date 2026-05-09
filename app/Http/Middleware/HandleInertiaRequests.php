<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string {
        return parent::version($request);
    }

    /**
     * Shared props
     */
    public function share(Request $request): array {
        return [

            ...parent::share($request),

            'auth' => [

                'user' => $request->user(),

                'roles' => $request->user()
                    ? $request->user()
                    ->getRoleNames()
                    ->values()
                    : [],

                'permissions' => $request->user()
                    ? $request->user()
                    ->getAllPermissions()
                    ->pluck('name')
                    ->values()
                    : [],
            ],
        ];
    }
}

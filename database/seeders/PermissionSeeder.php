<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder {
    public function run(): void {
        $modules = [

            'users' => [
                'view',
                'create',
                'edit',
                'delete',
                'assign.role',
            ],

            'roles' => [
                'view',
                'create',
                'edit',
                'delete',
                'assign.permission',
            ],

            'permissions' => [
                'view',
                'create',
                'edit',
                'delete',
            ],

          
        ];

        foreach ($modules as $module => $actions) {

            foreach ($actions as $action) {

                Permission::firstOrCreate(
                    [
                        'name' => "{$module}.{$action}",
                        'guard_name' => 'web',
                    ],
                    [
                        'display_name' => ucfirst(
                            str_replace(['.', '-'], ' ', $action)
                        ),

                        'group_name' => $module,
                    ]
                );
            }
        }
    }
}

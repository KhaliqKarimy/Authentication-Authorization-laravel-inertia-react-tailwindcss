<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct() {
        $this->middleware('auth');
        $this->middleware('permission:roles.view')->only(['index']);
        $this->middleware('permission:roles.create')->only(['store']);
        $this->middleware('permission:roles.edit')->only(['update']);
        $this->middleware('permission:roles.delete')->only(['destroy']);
        $this->middleware('permission:roles.syncPermissions')->only(['syncPermissions']);
    }




    public function index() {
        $roles = Role::with('permissions:id,name')
            ->latest()
            ->paginate(10);

        $permissions = Permission::select(
            'id',
            'name',
            'group_name'
        )
            ->orderBy('group_name')
            ->get()
            ->groupBy('group_name');

        return inertia('Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }
    public function syncPermissions(Request $request, Role $role) {
        $validated = $request->validate([
            'permissions' => ['array'],
            'permissions.*' => ['exists:permissions,id'],
        ]);

        $permissionNames = Permission::whereIn(
            'id',
            $validated['permissions'] ?? []
        )->pluck('name');

        $role->syncPermissions($permissionNames);

        return back()->with(
            'success',
            'Permissions updated successfully.'
        );
    }

    /**
     * Show the form for creating a new resource.
     */


    public function create() {
        

        return Inertia::render('Roles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */


   

    public function store(Request $request) {
        $validated = $request->validate([

            'name' => [
                'required',
                'string',
                'max:255',
                'unique:roles,name',
            ],
        ]);

        Role::create([

            'name' => $validated['name'],

            'guard_name' => 'web',
        ]);

        return redirect()
            ->route('roles.index')
            ->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(Role $role) {
        $permissions = Permission::select(
            'id',
            'name',
            'group_name'
        )
            ->orderBy('group_name')
            ->get()
            ->groupBy('group_name');

        return Inertia::render('Roles/Edit', [
            'role' => $role->load('permissions'),
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */


    public function update(Request $request, Role $role) {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],

            'permissions' => [
                'nullable',
                'array',
            ],

            'permissions.*' => [
                'exists:permissions,name',
            ],
        ]);

        $role->update([
            'name' => $validated['name'],
        ]);

        $role->syncPermissions(
            $validated['permissions'] ?? []
        );

        return redirect()
            ->route('roles.index')
            ->with(
                'success',
                'Role updated successfully.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role) {
        if ($role->name === 'developer') {

            return back()->withErrors([
                'error' => 'Developer role cannot be deleted.'
            ]);
        }

        $role->delete();

        return back()->with(
            'success',
            'Role deleted successfully.'
        );
    }
}

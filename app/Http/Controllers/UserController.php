<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct() {
        $this->middleware('auth');
        $this->middleware('permission:users.view')->only(['index']);
        $this->middleware('permission:users.create')->only(['store']);
        $this->middleware('permission:users.edit')->only(['update']);
        $this->middleware('permission:users.delete')->only(['destroy']);
        $this->middleware('permission:users.assign-role')->only(['assignRoles']);
    }

    public function index() {
        $users = User::query()
            ->with('roles:id,name')
            ->latest()
            ->select(
                'id',
                'name',
                'email',
                'created_at'
            )
            ->paginate(10)
            ->through(fn($user) => [

                'id' => $user->id,

                'name' => $user->name,

                'email' => $user->email,

                'created_at' => $user->created_at
                    ->format('Y-m-d'),

                'roles' => $user->roles
                    ->pluck('name')
                    ->values(),
            ]);

        $roles = Role::query()
            ->select('id', 'name')
            ->get();

        return Inertia::render('Users/Index', [

            'users' => $users,

            'roles' => $roles,
        ]);
    }


    public function assignRoles(
        Request $request,
        User $user
    ) {

        $validated = $request->validate([

            'roles' => ['array'],

            'roles.*' => [
                'exists:roles,name',
            ],
        ]);

        $user->syncRoles(
            $validated['roles'] ?? []
        );

        return back()->with(
            'success',
            'Roles updated successfully.'
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('users.index');
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
    public function edit(User $user) {
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user) {
        $validated = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }

        $user->save();

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {
        $user->delete();

        return redirect()->route('users.index');
    }
}

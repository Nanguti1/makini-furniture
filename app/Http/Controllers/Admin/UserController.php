<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(): Response
    {
        $this->authorize('view users');

        $query = User::query()->with('roles');

        // Search
        if (request()->has('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if (request()->has('role')) {
            $role = request('role');
            $query->whereHas('roles', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }

        $users = $query->latest()->paginate(10);
        $roles = Role::all();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => request()->only(['search', 'role']),
            'breadcrumbs' => [['title' => 'Users', 'href' => route('admin.users.index')]],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create users');

        $roles = Role::all();

        return Inertia::render('admin/users/create', [
            'roles' => $roles,
            'breadcrumbs' => [
                ['title' => 'Users', 'href' => route('admin.users.index')],
                ['title' => 'Create', 'href' => route('admin.users.create')],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create users');

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    public function show(User $user): Response
    {
        $this->authorize('view users');

        $user->load(['roles', 'roles.permissions']);

        return Inertia::render('admin/users/show', [
            'user' => $user,
            'breadcrumbs' => [
                ['title' => 'Users', 'href' => route('admin.users.index')],
                ['title' => $user->name, 'href' => route('admin.users.show', $user)],
            ],
        ]);
    }

    public function edit(User $user): Response
    {
        $this->authorize('edit users');

        $user->load('roles');
        $roles = Role::all();

        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'roles' => $roles,
            'breadcrumbs' => [
                ['title' => 'Users', 'href' => route('admin.users.index')],
                ['title' => 'Edit', 'href' => route('admin.users.edit', $user)],
            ],
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $this->authorize('edit users');

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        } else {
            $user->syncRoles([]);
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('delete users');

        // Prevent deletion of users with Super Admin role
        if ($user->hasRole('Super Admin')) {
            return back()->with('error', 'Cannot delete Super Admin users.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
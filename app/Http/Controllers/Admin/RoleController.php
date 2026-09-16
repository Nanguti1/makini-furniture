<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index(): Response
    {
        $this->authorize('view roles');

        $roles = Role::with('permissions')->orderBy('name')->paginate(10);

        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'breadcrumbs' => [['title' => 'Roles', 'href' => route('admin.roles.index')]],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create roles');

        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('admin/roles/create', [
            'permissions' => $permissions,
            'breadcrumbs' => [
                ['title' => 'Roles', 'href' => route('admin.roles.index')],
                ['title' => 'Create', 'href' => route('admin.roles.create')],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create roles');

        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role = Role::create(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role created successfully.');
    }

    public function edit(Role $role): Response
    {
        $this->authorize('edit roles');

        $role->load('permissions');
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('admin/roles/edit', [
            'role' => $role,
            'permissions' => $permissions,
            'breadcrumbs' => [
                ['title' => 'Roles', 'href' => route('admin.roles.index')],
                ['title' => 'Edit', 'href' => route('admin.roles.edit', $role)],
            ],
        ]);
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        $this->authorize('edit roles');

        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->update(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        } else {
            $role->syncPermissions([]);
        }

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $this->authorize('delete roles');

        // Prevent deletion of Super Admin role
        if ($role->name === 'Super Admin') {
            return back()->with('error', 'Cannot delete Super Admin role.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
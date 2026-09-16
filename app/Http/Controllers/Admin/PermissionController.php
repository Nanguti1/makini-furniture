<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $this->authorize('view permissions');

        $permissions = Permission::orderBy('name')->paginate(10);

        return Inertia::render('admin/permissions/index', [
            'permissions' => $permissions,
            'breadcrumbs' => [['title' => 'Permissions', 'href' => route('admin.permissions.index')]],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create permissions');

        return Inertia::render('admin/permissions/create', [
            'breadcrumbs' => [
                ['title' => 'Permissions', 'href' => route('admin.permissions.index')],
                ['title' => 'Create', 'href' => route('admin.permissions.create')],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create permissions');

        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission created successfully.');
    }

    public function edit(Permission $permission): Response
    {
        $this->authorize('edit permissions');

        return Inertia::render('admin/permissions/edit', [
            'permission' => $permission,
            'breadcrumbs' => [
                ['title' => 'Permissions', 'href' => route('admin.permissions.index')],
                ['title' => 'Edit', 'href' => route('admin.permissions.edit', $permission)],
            ],
        ]);
    }

    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $this->authorize('edit permissions');

        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update(['name' => $request->name]);

        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $this->authorize('delete permissions');

        $permission->delete();

        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
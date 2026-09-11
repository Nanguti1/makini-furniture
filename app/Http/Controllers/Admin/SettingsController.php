<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/settings/index', [
            'settings' => [
                'app_name' => Setting::get('app_name', config('app.name')),
                'app_url' => Setting::get('app_url', config('app.url')),
                'mail_from_address' => Setting::get('mail_from_address', config('mail.from.address')),
                'mail_from_name' => Setting::get('mail_from_name', config('mail.from.name')),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'app_name' => 'required|string|max:255',
            'app_url' => 'required|url|max:255',
            'mail_from_address' => 'required|email|max:255',
            'mail_from_name' => 'required|string|max:255',
        ]);

        Setting::set('app_name', $validated['app_name'], 'string', 'general');
        Setting::set('app_url', $validated['app_url'], 'string', 'general');
        Setting::set('mail_from_address', $validated['mail_from_address'], 'string', 'mail');
        Setting::set('mail_from_name', $validated['mail_from_name'], 'string', 'mail');

        return back()->with('success', 'Settings updated successfully.');
    }
}
import { Head } from '@inertiajs/react';

export default function Register() {
    return (
        <>
            <Head title="Registration Disabled" />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Registration Disabled</h1>
                    <p className="text-muted-foreground">
                        User registration is currently disabled. Please contact an administrator if you need an account.
                    </p>
                </div>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Registration Disabled',
    description: 'User registration is currently disabled',
};

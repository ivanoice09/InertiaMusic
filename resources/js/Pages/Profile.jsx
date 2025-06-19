import React from 'react';
import { Head } from '@inertiajs/react';

export default function Profile() {
    return (
        <>
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-xl font-semibold">Your Profile</h2>
                            <p className="mt-4">This is your profile page.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url } = usePage()
    
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link 
                            href="/" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                url === '/' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Home
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link 
                            href="/profile" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                url.startsWith('/profile') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
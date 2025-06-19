import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            router.get('/search', { q: debouncedQuery }, {
                preserveState: true,
                replace: true,
            });
        } else if (debouncedQuery.length === 0) {
            // Optional: Clear search results when query is empty
            // router.get('/');
        }
    }, [debouncedQuery]);

    return (
        <div className="w-full max-w-md">
            <input
                type="text"
                placeholder="Search songs..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
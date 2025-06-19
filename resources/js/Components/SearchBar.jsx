import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import RecentSearches from './RecentSearches';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length >= 0) {
            router.get('/search', { q: debouncedQuery }, {
                preserveState: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            });
        } else if (debouncedQuery.length === 0) {
            // Optional: Clear search results when query is empty
            // router.get('/');
        }
    }, [debouncedQuery]);

    const clearSearch = () => {
        setQuery('');
        setDebouncedQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search songs..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                )}
                {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
                <RecentSearches
                    show={showSuggestions}
                    query={query}
                    onSelect={(searchTerm) => {
                        setQuery(searchTerm);
                        setDebouncedQuery(searchTerm);
                        setShowSuggestions(false);
                    }}
                />
            </div>
        </div>
    );
}
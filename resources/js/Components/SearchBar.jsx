import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import RecentSearches from './RecentSearches';
import useRecentSearches from '../hooks/useRecentSearches';

export default function SearchBar() {
    const { url } = usePage();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { addRecentSearch } = useRecentSearches();

    // Clear search when navigating away
    useEffect(() => {
        const unsub = router.on('navigate', () => {
            setQuery('');
            setDebouncedQuery('');
            setShowSuggestions(false);
        });

        return () => unsub();
    }, []);

    // Debounce the search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            addRecentSearch(debouncedQuery);
            router.get('/search', { q: debouncedQuery }, {
                preserveState: true,
                replace: true,
            });
        } else if (debouncedQuery.length === 0 && url !== '/') {
            // Only navigate home if we're not already there
            router.visit('/', {}, {
                preserveScoll: true,
                replace: true
            });
        }
    }, [debouncedQuery, url]);

    const clearSearch = () => {
        setQuery('');
        setDebouncedQuery('');
        setShowSuggestions(false);
        if (url !== '/') {
            router.visit('/');
        }
    };

    return (
        <div className="w-full max-w-md relative">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search songs..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" 
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>
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
    );
}
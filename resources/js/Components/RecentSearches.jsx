import React, { useState, useEffect } from 'react';

export default function RecentSearches({ show, query, onSelect }) {
    const [recentSearches, setRecentSearches] = useState([]);
    const popularSearches = ['Rock', 'Pop', 'Jazz', 'Electronic', 'Classical'];

    useEffect(() => {
        try {
            // Safely load recent searches from localStorage
            const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            // Ensure we have an array and filter out any invalid entries
            setRecentSearches(Array.isArray(savedSearches) ? savedSearches.filter(item => typeof item === 'string') : []);
        } catch (error) {
            console.error('Failed to parse recent searches:', error);
            setRecentSearches([]);
        }
    }, []);


    const handleSearchSelect = (searchTerm) => {

        // Trim and validate the search term
        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) return;

        onSelect(searchTerm);
        // Update recent searches
        const updatedSearches = [
            searchTerm,
            ...recentSearches.filter(term => term !== searchTerm)
        ].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    if (!show || query.length > 0) return null;

    return (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
            <div className="py-1">
                {recentSearches.length > 0 && (
                    <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500">Recent Searches</div>
                        {recentSearches.map((search, index) => (
                            <button
                                key={index}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleSearchSelect(search)}
                            >
                                {search}
                            </button>
                        ))}
                    </>
                )}
                <div className="px-4 py-2 text-xs font-semibold text-gray-500">Popular Searches</div>
                {popularSearches.map((search, index) => (
                    <button
                        key={index}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSearchSelect(search)}
                    >
                        {search}
                    </button>
                ))}
            </div>
        </div>
    );
}
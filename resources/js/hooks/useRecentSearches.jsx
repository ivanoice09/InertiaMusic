import { useState, useEffect } from 'react';

export default function useRecentSearches(maxItems = 5) {
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        loadRecentSearches();
    }, []);

    const loadRecentSearches = () => {
        try {
            const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            setRecentSearches(Array.isArray(savedSearches) ? savedSearches : []);
        } catch (error) {
            console.error('Failed to load recent searches:', error);
        }
    };

    const addRecentSearch = (searchTerm) => {
        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) return;

        const updatedSearches = [
            trimmedTerm,
            ...recentSearches.filter(term => 
                term.toLowerCase() !== trimmedTerm.toLowerCase()
            )
        ].slice(0, maxItems);

        saveRecentSearches(updatedSearches);
    };

    const removeRecentSearch = (index) => {
        const updatedSearches = recentSearches.filter((_, i) => i !== index);
        saveRecentSearches(updatedSearches);
    };

    const clearRecentSearches = () => {
        saveRecentSearches([]);
    };

    const saveRecentSearches = (searches) => {
        setRecentSearches(searches);
        try {
            localStorage.setItem('recentSearches', JSON.stringify(searches));
        } catch (error) {
            console.error('Failed to save recent searches:', error);
        }
    };

    return { 
        recentSearches, 
        addRecentSearch, 
        removeRecentSearch,
        clearRecentSearches
    };
}
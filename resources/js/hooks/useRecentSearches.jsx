import { useState, useEffect } from 'react';

export default function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        try {
            const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            setRecentSearches(Array.isArray(savedSearches) ? savedSearches : []);
        } catch (error) {
            console.error('Failed to load recent searches:', error);
        }
    }, []);

    const addRecentSearch = (searchTerm) => {
        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) return;

        const updatedSearches = [
            trimmedTerm,
            ...recentSearches.filter(term => 
                term.toLowerCase() !== trimmedTerm.toLowerCase()
            )
        ].slice(0, 5);

        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    return { recentSearches, addRecentSearch };
}
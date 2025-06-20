import React from 'react';
import useRecentSearches from '../hooks/useRecentSearches';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecentSearches({ show, query, onSelect }) {
    const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();
    const popularSearches = ['Rock', 'Pop', 'Jazz', 'Electronic', 'Classical'];

    const handleSearchSelect = (searchTerm) => {
        addRecentSearch(searchTerm);
        onSelect(searchTerm);
    };

    const handleRemoveClick = (e, index) => {
        e.stopPropagation();
        e.preventDefault(); // Add this to prevent blur
        removeRecentSearch(index);
    };

    if (!show || query.length >= 2) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="py-1">
                        {recentSearches.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-xs font-semibold text-gray-500 flex justify-between items-center">
                                    <span>Recent Searches</span>
                                    <button
                                        className="text-xs text-blue-500 hover:text-blue-700"
                                        onClick={() => clearRecentSearches()}
                                    >
                                        Clear All
                                    </button>
                                </div>
                                {recentSearches.map((search, index) => (
                                    <motion.div 
                                        key={`recent-${index}`} 
                                        className="group flex items-center justify-between hover:bg-gray-100"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}    
                                    >
                                        <button
                                            key={`recent-${index}`}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleSearchSelect(search)}
                                        >
                                            {search}
                                        </button>
                                        {/* Remove from recent searches dropdown: */}
                                        <button
                                            className="pr-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                                            onClick={(e) => handleRemoveClick(e, index)}
                                            onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                                        >
                                            ×
                                        </button>
                                    </motion.div>
                                ))}
                            </>
                        )}
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500">Popular Searches</div>
                        {popularSearches.map((search, index) => (
                            <motion.button
                                key={`popular-${index}`}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => onSelect(search)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (recentSearches.length + index) * 0.05 }}
                            >
                                {search}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
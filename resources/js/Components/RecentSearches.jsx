import useRecentSearches from '../hooks/useRecentSearches';

export default function RecentSearches({ show, query, onSelect }) {
    const { recentSearches, addRecentSearch } = useRecentSearches();
    const popularSearches = ['Rock', 'Pop', 'Jazz', 'Electronic', 'Classical'];

    const handleSearchSelect = (searchTerm) => {
        addRecentSearch(searchTerm);
        onSelect(searchTerm);
    };

    if (!show || query.length >= 2) return null;

    return (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
            <div className="py-1">
                {recentSearches.length > 0 && (
                    <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500">Recent Searches</div>
                        {recentSearches.map((search, index) => (
                            <button
                                key={`recent-${index}`}
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
                        key={`popular-${index}`}
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
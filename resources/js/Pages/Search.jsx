import { Head } from '@inertiajs/react';
import { usePlayer } from '../Contexts/PlayerContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search({ q, songs, error }) {
    const { playSong } = usePlayer();

    return (
        <>
            <Head title={`Search: ${q}`} />
            <div className="music-container">
                <h1 className="music-title">Search Results for "{q}"</h1>
                {error ? (
                    <div className="text-center text-red-500 py-4">{error}</div>
                ) : songs === null ? (
                    <div className="flex justify-center py-10">
                        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : songs.length > 0 ? (
                    <ul className="song-list">
                        <AnimatePresence>
                            {songs.map((song) => (
                                <li
                                    key={song.id}
                                    className="song-item"
                                    onClick={() => playSong(song)}
                                >
                                    <img
                                        src={song.image}
                                        alt={song.name}
                                        className="song-image"
                                    />
                                    <div className="song-info">
                                        <h3>{song.name}</h3>
                                        <p>{song.artist_name}</p>
                                    </div>
                                </li>
                            ))}
                        </AnimatePresence>
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No results found.</p>
                )}
            </div>
        </>
    );
}
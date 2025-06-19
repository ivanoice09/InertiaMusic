import { Head } from '@inertiajs/react';
import { usePlayer } from '../Contexts/PlayerContext';

export default function Search({ q, songs }) {
    const { playSong } = usePlayer();

    return (
        <>
            <Head title={`Search: ${q}`} />
            <div className="music-container">
                <h1 className="music-title">Search Results for "{q}"</h1>
                {songs.length > 0 ? (
                    <ul className="song-list">
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
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No results found.</p>
                )}
            </div>
        </>
    );
}
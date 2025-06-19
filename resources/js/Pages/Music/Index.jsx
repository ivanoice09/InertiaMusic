import { Head } from '@inertiajs/react';
import { usePlayer } from '../../Contexts/PlayerContext';

export default function MusicIndex({ songs }) {
    const { playSong } = usePlayer();

    return (
        <>
            <Head title="Popular Music" />
            <div className="music-container">
                <h1 className="music-title">Popular Songs</h1>
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
            </div>
        </>
    );
}
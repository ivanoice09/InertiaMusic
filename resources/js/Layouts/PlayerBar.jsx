import React from 'react';
import { usePlayer } from '../Contexts/PlayerContext';

export default function PlayerBar() {
    const { currentSong, isPlaying, togglePlayPause } = usePlayer();

    if (!currentSong) return null;

    return (
        <div className="player-bar">
            <div className="now-playing">
                Now Playing: {currentSong.name} - {currentSong.artist_name}
            </div>
            <audio
                controls
                autoPlay={isPlaying}
                src={currentSong.audio}
                onEnded={togglePlayPause}
                className="audio-player"
            />
        </div>
    );
}
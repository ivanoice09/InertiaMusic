import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };
    
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };
    
    return (
        <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, togglePlayPause }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}
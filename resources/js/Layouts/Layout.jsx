import React from 'react';
import { PlayerProvider, usePlayer } from '../Contexts/PlayerContext';
import Navbar from './Navbar'; // We'll move Navbar to its own file
import PlayerBar from './PlayerBar'; // Similarly for PlayerBar

export default function Layout({ children }) {
    return (
        <PlayerProvider>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="pb-16"> {/* Padding for player bar */}
                    {children}
                </main>
                <PlayerBar />
            </div>
        </PlayerProvider>
    );
}


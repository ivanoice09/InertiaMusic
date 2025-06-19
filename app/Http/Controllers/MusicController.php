<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MusicController extends Controller
{
    public function getPopularSongs()
    {
        // Jamendo API endpoint for popular tracks
        $url = 'https://api.jamendo.com/v3.0/tracks/';

        // Your Jamendo client ID (register at https://devportal.jamendo.com/)
        $clientId = config('services.jamendo.client_id');

        // Make API request
        $response = Http::get($url, [
            'client_id' => $clientId,
            'format' => 'json',
            'limit' => 10,
            'order' => 'popularity_total',
        ]);

        // Process the response
        if ($response->successful()) {
            $data = $response->json();
            return $data['results'] ?? [];
        }

        return [];
    }

    public function index()
    {
        $songs = $this->getPopularSongs();

        return Inertia::render('Music/Index', [
            'songs' => $songs,
        ]);
    }
}

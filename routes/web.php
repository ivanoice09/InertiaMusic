<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MusicController;

// Home page
Route::get('/', [MusicController::class, 'index'])->name('music.index');

Route::get('/search', [MusicController::class, 'search'])->name('page.search');

// Profile page
Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('profile');

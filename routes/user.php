<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\AttemptController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Theme
    Route::patch('/theme', [ThemeController::class, 'update'])->name('theme.update');

    // Quizzes for students
    Route::get('/quizzes', [AttemptController::class, 'index'])->name('quizzes.index');
    Route::get('/quizzes/{quiz}', [AttemptController::class, 'show'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}', [AttemptController::class, 'store'])->name('quizzes.store');
    Route::get('/quizzes/{quiz}/result', [AttemptController::class, 'result'])->name('quizzes.result');
});

<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\QuizController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->name('admin.')->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('quizzes', QuizController::class);
});

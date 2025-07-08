<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    return response()->json([
        'message' => 'Welcome to TodoList API',
        'endpoints' => [
            'register' => '/api/register',
            'login' => '/api/login',
            'tasks' => '/api/tasks'
        ]
    ]);
});

// Публичные маршруты (без аутентификации)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Защищённые маршруты (требуют JWT)
Route::middleware('jwt.auth')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
    Route::patch('/tasks/{id}', [TaskController::class, 'update']);
});

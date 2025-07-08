<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'TodoList API',
        'docs' => 'Use /api endpoints'
    ]);
});

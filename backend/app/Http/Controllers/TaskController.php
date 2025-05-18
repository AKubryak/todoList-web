<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Task;

class TaskController extends Controller
{
    public function index() {
        $user = Auth::user();
        return $user->tasks;
    }

    public function store(Request $request)
    {
        Log::info('Task store request:', $request->all());

        try {
            $validated = $request->validate([
                'text' => 'required|string|max:255',
                'is_completed' => 'boolean'
            ]);

            Log::info('Validated data:', $validated);

            $task = $request->user()->tasks()->create($validated);

            Log::info('Task created:', $task->toArray());

            return response()->json($task, 201);
        } catch (\Exception $e) {
            Log::error('Task creation error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);

            if ($task->user_id != Auth::id()) {
                return response()->json(['error' => 'Forbidden'], 403);
            }

            $task->delete();

            return response()->json(['message' => 'Task deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            if ($task->user_id != Auth::id()) {
                return response()->json(['error' => 'Forbidden'], 403);
            }

            $validated = $request->validate([
                'text' => 'sometimes|string|max:255',
                'is_completed' => 'sometimes|boolean'
            ]);

            $task->update($validated);

            return response()->json($task);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class QuizController extends Controller
{
    /**
     * Display a listing of quizzes.
     */
    public function index(): Response
    {
        $quizzes = Quiz::with('creator', 'questions')
            ->withCount('questions')
            ->latest()
            ->get();

        return Inertia::render('Admin/Quizzes/Index', [
            'quizzes' => $quizzes,
        ]);
    }

    /**
     * Show the form for creating a new quiz.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Quizzes/Create');
    }

    /**
     * Store a newly created quiz in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'questions' => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.option_a' => 'required|string',
            'questions.*.option_b' => 'required|string',
            'questions.*.option_c' => 'required|string',
            'questions.*.option_d' => 'required|string',
            'questions.*.correct_option' => 'required|in:a,b,c,d',
        ]);

        // Create the quiz
        $quiz = Quiz::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'duration_minutes' => $validated['duration_minutes'],
            'created_by' => auth()->id(),
        ]);

        // Create the questions
        foreach ($validated['questions'] as $questionData) {
            Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => $questionData['question_text'],
                'option_a' => $questionData['option_a'],
                'option_b' => $questionData['option_b'],
                'option_c' => $questionData['option_c'],
                'option_d' => $questionData['option_d'],
                'correct_option' => $questionData['correct_option'],
            ]);
        }

        return redirect()->route('admin.quizzes.index')
            ->with('success', 'Quiz created successfully with ' . count($validated['questions']) . ' questions.');
    }

    /**
     * Display the specified quiz.
     */
    public function show(Quiz $quiz): Response
    {
        $quiz->load(['questions', 'creator', 'results.user']);

        return Inertia::render('Admin/Quizzes/Show', [
            'quiz' => $quiz,
        ]);
    }

    /**
     * Remove the specified quiz from storage.
     */
    public function destroy(Quiz $quiz): RedirectResponse
    {
        $quiz->delete();

        return redirect()->route('admin.quizzes.index')
            ->with('success', 'Quiz deleted successfully.');
    }
}

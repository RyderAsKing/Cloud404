<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Result;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AttemptController extends Controller
{
    /**
     * Display a listing of available quizzes for students.
     */
    public function index(): Response
    {
        $quizzes = Quiz::with('creator')
            ->withCount('questions')
            ->latest()
            ->get()
            ->map(function ($quiz) {
                // Check if user has already attempted this quiz
                $hasAttempted = Result::where('user_id', auth()->id())
                    ->where('quiz_id', $quiz->id)
                    ->exists();

                return [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                    'duration_minutes' => $quiz->duration_minutes,
                    'questions_count' => $quiz->questions_count,
                    'creator' => $quiz->creator->name,
                    'has_attempted' => $hasAttempted,
                ];
            });

        return Inertia::render('Student/Quizzes/Index', [
            'quizzes' => $quizzes,
        ]);
    }

    /**
     * Display the quiz for taking.
     */
    public function show(Quiz $quiz): Response|RedirectResponse
    {
        // Check if user has already attempted this quiz
        $hasAttempted = Result::where('user_id', auth()->id())
            ->where('quiz_id', $quiz->id)
            ->exists();

        if ($hasAttempted) {
            return redirect()->route('quizzes.result', $quiz)
                ->with('warning', 'You have already attempted this quiz.');
        }

        // Load questions without correct_option for security
        $questions = $quiz->questions->map(function ($question) {
            return [
                'id' => $question->id,
                'question_text' => $question->question_text,
                'option_a' => $question->option_a,
                'option_b' => $question->option_b,
                'option_c' => $question->option_c,
                'option_d' => $question->option_d,
            ];
        });

        return Inertia::render('Student/Quizzes/Take', [
            'quiz' => [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'description' => $quiz->description,
                'duration_minutes' => $quiz->duration_minutes,
                'questions' => $questions,
            ],
        ]);
    }

    /**
     * Store the quiz attempt and calculate score automatically.
     */
    public function store(Request $request, Quiz $quiz): RedirectResponse
    {
        // Check if user has already attempted this quiz
        $hasAttempted = Result::where('user_id', auth()->id())
            ->where('quiz_id', $quiz->id)
            ->exists();

        if ($hasAttempted) {
            return redirect()->route('quizzes.result', $quiz)
                ->with('warning', 'You have already attempted this quiz.');
        }

        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'required|in:a,b,c,d',
        ]);

        // Load questions with correct answers
        $questions = $quiz->questions;
        $totalQuestions = $questions->count();
        $score = 0;

        // CRITICAL: Automatic Evaluation
        foreach ($questions as $question) {
            $userAnswer = $validated['answers'][$question->id] ?? null;

            if ($userAnswer && $userAnswer === $question->correct_option) {
                $score++;
            }
        }

        // Save the result
        Result::create([
            'user_id' => auth()->id(),
            'quiz_id' => $quiz->id,
            'score' => $score,
            'total_questions' => $totalQuestions,
            'attempt_date' => now(),
        ]);

        return redirect()->route('quizzes.result', $quiz)
            ->with('success', 'Quiz submitted successfully!');
    }

    /**
     * Show the result of a quiz attempt.
     */
    public function result(Quiz $quiz): Response|RedirectResponse
    {
        $result = Result::where('user_id', auth()->id())
            ->where('quiz_id', $quiz->id)
            ->with('quiz')
            ->first();

        if (!$result) {
            return redirect()->route('quizzes.index')
                ->with('error', 'You have not attempted this quiz yet.');
        }

        return Inertia::render('Student/Quizzes/Result', [
            'result' => [
                'score' => $result->score,
                'total_questions' => $result->total_questions,
                'percentage' => $result->percentage,
                'attempt_date' => $result->attempt_date->format('M d, Y h:i A'),
                'quiz' => [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                ],
            ],
        ]);
    }
}

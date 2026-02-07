<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'score',
        'total_questions',
        'attempt_date',
    ];

    protected $casts = [
        'attempt_date' => 'datetime',
    ];

    /**
     * Get the user who took the quiz.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the quiz for this result.
     */
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Get the percentage score.
     */
    public function getPercentageAttribute(): float
    {
        return $this->total_questions > 0
            ? round(($this->score / $this->total_questions) * 100, 2)
            : 0;
    }
}

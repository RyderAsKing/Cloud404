import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Clock, FileQuestion } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Alert, AlertDescription } from "@/Components/ui/alert";

interface Question {
    id: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
}

interface Quiz {
    id: number;
    title: string;
    description: string;
    duration_minutes: number;
    questions: Question[];
}

interface Props extends PageProps {
    quiz: Quiz;
}

function Take({ quiz }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        answers: {} as Record<number, "a" | "b" | "c" | "d">,
    });

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleAnswerChange = (
        questionId: number,
        value: "a" | "b" | "c" | "d",
    ) => {
        setData("answers", {
            ...data.answers,
            [questionId]: value,
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Check if all questions are answered
        const unanswered = quiz.questions.filter((q) => !data.answers[q.id]);
        if (unanswered.length > 0) {
            if (
                !confirm(
                    `You have ${unanswered.length} unanswered questions. Submit anyway?`,
                )
            ) {
                return;
            }
        }

        post(route("quizzes.store", quiz.id));
    };

    const currentQ = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
        <>
            <Head title={`Take Quiz: ${quiz.title}`} />
            <form onSubmit={submit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle>{quiz.title}</CardTitle>
                                <CardDescription>
                                    {quiz.description}
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    {quiz.duration_minutes} min
                                </div>
                                <div className="flex items-center">
                                    <FileQuestion className="mr-1 h-4 w-4" />
                                    {quiz.questions.length} questions
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Question {currentQuestion + 1} of{" "}
                                {quiz.questions.length}
                            </p>
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Question {currentQuestion + 1}
                        </CardTitle>
                        <CardDescription className="text-base text-foreground">
                            {currentQ.question_text}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <RadioGroup
                            value={data.answers[currentQ.id] || ""}
                            onValueChange={(value: string) =>
                                handleAnswerChange(
                                    currentQ.id,
                                    value as "a" | "b" | "c" | "d",
                                )
                            }
                        >
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                                    <RadioGroupItem
                                        value="a"
                                        id={`q${currentQ.id}-a`}
                                    />
                                    <Label
                                        htmlFor={`q${currentQ.id}-a`}
                                        className="flex-1 cursor-pointer"
                                    >
                                        A. {currentQ.option_a}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                                    <RadioGroupItem
                                        value="b"
                                        id={`q${currentQ.id}-b`}
                                    />
                                    <Label
                                        htmlFor={`q${currentQ.id}-b`}
                                        className="flex-1 cursor-pointer"
                                    >
                                        B. {currentQ.option_b}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                                    <RadioGroupItem
                                        value="c"
                                        id={`q${currentQ.id}-c`}
                                    />
                                    <Label
                                        htmlFor={`q${currentQ.id}-c`}
                                        className="flex-1 cursor-pointer"
                                    >
                                        C. {currentQ.option_c}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                                    <RadioGroupItem
                                        value="d"
                                        id={`q${currentQ.id}-d`}
                                    />
                                    <Label
                                        htmlFor={`q${currentQ.id}-d`}
                                        className="flex-1 cursor-pointer"
                                    >
                                        D. {currentQ.option_d}
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>

                        {!data.answers[currentQ.id] && (
                            <Alert>
                                <AlertDescription>
                                    Please select an answer before proceeding
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            setCurrentQuestion(Math.max(0, currentQuestion - 1))
                        }
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </Button>

                    {currentQuestion < quiz.questions.length - 1 ? (
                        <Button
                            type="button"
                            onClick={() =>
                                setCurrentQuestion(currentQuestion + 1)
                            }
                        >
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" disabled={processing}>
                            {processing ? "Submitting..." : "Submit Quiz"}
                        </Button>
                    )}
                </div>

                {/* Question navigation */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Question Navigation
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {quiz.questions.map((q, idx) => (
                                <Button
                                    key={q.id}
                                    type="button"
                                    variant={
                                        currentQuestion === idx
                                            ? "default"
                                            : data.answers[q.id]
                                              ? "secondary"
                                              : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setCurrentQuestion(idx)}
                                    className="w-10 h-10"
                                >
                                    {idx + 1}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}

Take.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Quizzes", link: route("quizzes.index") },
            { name: "Take Quiz" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);

export default Take;

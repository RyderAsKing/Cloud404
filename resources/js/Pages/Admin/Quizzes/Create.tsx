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
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { FormEventHandler, useState } from "react";

interface Question {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: "a" | "b" | "c" | "d";
}

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        duration_minutes: 30,
        questions: [
            {
                question_text: "",
                option_a: "",
                option_b: "",
                option_c: "",
                option_d: "",
                correct_option: "a" as "a" | "b" | "c" | "d",
            },
        ] as Question[],
    });

    const addQuestion = () => {
        setData("questions", [
            ...data.questions,
            {
                question_text: "",
                option_a: "",
                option_b: "",
                option_c: "",
                option_d: "",
                correct_option: "a" as "a" | "b" | "c" | "d",
            },
        ]);
    };

    const removeQuestion = (index: number) => {
        if (data.questions.length > 1) {
            setData(
                "questions",
                data.questions.filter((_, i) => i !== index),
            );
        }
    };

    const updateQuestion = (
        index: number,
        field: keyof Question,
        value: string,
    ) => {
        const updated = [...data.questions];
        updated[index] = { ...updated[index], [field]: value };
        setData("questions", updated);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.quizzes.store"));
    };

    return (
        <>
            <Head title="Create Quiz" />
            <form onSubmit={submit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quiz Details</CardTitle>
                        <CardDescription>
                            Enter the basic information about your quiz
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Quiz Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                placeholder="e.g., Introduction to Computer Science"
                                required
                            />
                            {errors.title && (
                                <p className="text-sm text-destructive">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Description (Optional)
                            </Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>,
                                ) => setData("description", e.target.value)}
                                placeholder="Brief description of the quiz"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (Minutes)</Label>
                            <Input
                                id="duration"
                                type="number"
                                min="1"
                                value={data.duration_minutes}
                                onChange={(e) =>
                                    setData(
                                        "duration_minutes",
                                        parseInt(e.target.value),
                                    )
                                }
                                required
                            />
                            {errors.duration_minutes && (
                                <p className="text-sm text-destructive">
                                    {errors.duration_minutes}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Questions</h3>
                            <p className="text-sm text-muted-foreground">
                                Add questions to your quiz
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={addQuestion}
                            variant="outline"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Question
                        </Button>
                    </div>

                    {data.questions.map((question, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">
                                        Question {index + 1}
                                    </CardTitle>
                                    {data.questions.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeQuestion(index)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Question Text</Label>
                                    <Textarea
                                        value={question.question_text}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLTextAreaElement>,
                                        ) =>
                                            updateQuestion(
                                                index,
                                                "question_text",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter your question"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Option A</Label>
                                        <Input
                                            value={question.option_a}
                                            onChange={(e) =>
                                                updateQuestion(
                                                    index,
                                                    "option_a",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Option A"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option B</Label>
                                        <Input
                                            value={question.option_b}
                                            onChange={(e) =>
                                                updateQuestion(
                                                    index,
                                                    "option_b",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Option B"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option C</Label>
                                        <Input
                                            value={question.option_c}
                                            onChange={(e) =>
                                                updateQuestion(
                                                    index,
                                                    "option_c",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Option C"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Option D</Label>
                                        <Input
                                            value={question.option_d}
                                            onChange={(e) =>
                                                updateQuestion(
                                                    index,
                                                    "option_d",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Option D"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Correct Answer</Label>
                                    <RadioGroup
                                        value={question.correct_option}
                                        onValueChange={(value: string) =>
                                            updateQuestion(
                                                index,
                                                "correct_option",
                                                value,
                                            )
                                        }
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="a"
                                                id={`q${index}-a`}
                                            />
                                            <Label htmlFor={`q${index}-a`}>
                                                Option A
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="b"
                                                id={`q${index}-b`}
                                            />
                                            <Label htmlFor={`q${index}-b`}>
                                                Option B
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="c"
                                                id={`q${index}-c`}
                                            />
                                            <Label htmlFor={`q${index}-c`}>
                                                Option C
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="d"
                                                id={`q${index}-d`}
                                            />
                                            <Label htmlFor={`q${index}-d`}>
                                                Option D
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={processing}>
                        {processing ? "Creating..." : "Create Quiz"}
                    </Button>
                </div>
            </form>
        </>
    );
}

Create.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Admin", link: route("dashboard") },
            { name: "Quizzes", link: route("admin.quizzes.index") },
            { name: "Create" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);

export default Create;

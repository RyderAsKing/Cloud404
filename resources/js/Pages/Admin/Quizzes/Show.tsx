import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Clock, FileQuestion, User, ArrowLeft, Trash2 } from "lucide-react";

interface Question {
    id: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
}

interface Result {
    id: number;
    score: number;
    total_questions: number;
    attempt_date: string;
    user: {
        name: string;
        email: string;
    };
}

interface Quiz {
    id: number;
    title: string;
    description: string;
    duration_minutes: number;
    creator: {
        name: string;
    };
    questions: Question[];
    results: Result[];
    created_at: string;
}

interface Props extends PageProps {
    quiz: Quiz;
}

function Show({ quiz }: Props) {
    const handleDelete = () => {
        if (
            confirm(
                "Are you sure you want to delete this quiz? This will also delete all results.",
            )
        ) {
            router.delete(route("admin.quizzes.destroy", quiz.id), {
                onSuccess: () => router.visit(route("admin.quizzes.index")),
            });
        }
    };

    return (
        <>
            <Head title={`Quiz: ${quiz.title}`} />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route("admin.quizzes.index")}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Link>
                        </Button>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                {quiz.title}
                            </h2>
                            <p className="text-muted-foreground">
                                Created by {quiz.creator.name}
                            </p>
                        </div>
                    </div>
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Quiz
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Questions
                            </CardTitle>
                            <FileQuestion className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {quiz.questions.length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Duration
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {quiz.duration_minutes} min
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Attempts
                            </CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {quiz.results.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {quiz.description && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {quiz.description}
                            </p>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Questions</CardTitle>
                        <CardDescription>
                            All questions in this quiz
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {quiz.questions.map((question, index) => (
                            <Card key={question.id}>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Question {index + 1}
                                    </CardTitle>
                                    <CardDescription>
                                        {question.question_text}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div
                                            className={`p-2 rounded border ${question.correct_option === "a" ? "bg-green-50 border-green-200" : ""}`}
                                        >
                                            <span className="font-medium">
                                                A:
                                            </span>{" "}
                                            {question.option_a}
                                            {question.correct_option ===
                                                "a" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2"
                                                >
                                                    Correct
                                                </Badge>
                                            )}
                                        </div>
                                        <div
                                            className={`p-2 rounded border ${question.correct_option === "b" ? "bg-green-50 border-green-200" : ""}`}
                                        >
                                            <span className="font-medium">
                                                B:
                                            </span>{" "}
                                            {question.option_b}
                                            {question.correct_option ===
                                                "b" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2"
                                                >
                                                    Correct
                                                </Badge>
                                            )}
                                        </div>
                                        <div
                                            className={`p-2 rounded border ${question.correct_option === "c" ? "bg-green-50 border-green-200" : ""}`}
                                        >
                                            <span className="font-medium">
                                                C:
                                            </span>{" "}
                                            {question.option_c}
                                            {question.correct_option ===
                                                "c" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2"
                                                >
                                                    Correct
                                                </Badge>
                                            )}
                                        </div>
                                        <div
                                            className={`p-2 rounded border ${question.correct_option === "d" ? "bg-green-50 border-green-200" : ""}`}
                                        >
                                            <span className="font-medium">
                                                D:
                                            </span>{" "}
                                            {question.option_d}
                                            {question.correct_option ===
                                                "d" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2"
                                                >
                                                    Correct
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {quiz.results.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Results</CardTitle>
                            <CardDescription>
                                All attempts made on this quiz
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead>Percentage</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quiz.results.map((result) => (
                                        <TableRow key={result.id}>
                                            <TableCell className="font-medium">
                                                {result.user.name}
                                            </TableCell>
                                            <TableCell>
                                                {result.user.email}
                                            </TableCell>
                                            <TableCell>
                                                {result.score}/
                                                {result.total_questions}
                                            </TableCell>
                                            <TableCell>
                                                {(
                                                    (result.score /
                                                        result.total_questions) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </TableCell>
                                            <TableCell>
                                                {result.attempt_date}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

Show.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Admin", link: route("dashboard") },
            { name: "Quizzes", link: route("admin.quizzes.index") },
            { name: "View" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);

export default Show;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { BookOpen, Clock, FileQuestion, CheckCircle2 } from "lucide-react";

interface Quiz {
    id: number;
    title: string;
    description: string;
    duration_minutes: number;
    questions_count: number;
    creator: string;
    has_attempted: boolean;
}

interface Props extends PageProps {
    quizzes: Quiz[];
}

function Index({ quizzes }: Props) {
    return (
        <>
            <Head title="Available Quizzes" />
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Available Quizzes
                    </h2>
                    <p className="text-muted-foreground">
                        Browse and take quizzes to test your knowledge
                    </p>
                </div>

                {quizzes.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                                No quizzes available yet
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {quizzes.map((quiz) => (
                            <Card key={quiz.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">
                                            {quiz.title}
                                        </CardTitle>
                                        {quiz.has_attempted && (
                                            <Badge
                                                variant="secondary"
                                                className="ml-2"
                                            >
                                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                                Completed
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {quiz.description ||
                                            "No description available"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-muted-foreground">
                                            <FileQuestion className="mr-2 h-4 w-4" />
                                            <span>
                                                {quiz.questions_count} questions
                                            </span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Clock className="mr-2 h-4 w-4" />
                                            <span>
                                                {quiz.duration_minutes} minutes
                                            </span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            <span>
                                                Created by {quiz.creator}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {quiz.has_attempted ? (
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "quizzes.result",
                                                    quiz.id,
                                                )}
                                            >
                                                View Result
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button className="w-full" asChild>
                                            <Link
                                                href={route(
                                                    "quizzes.show",
                                                    quiz.id,
                                                )}
                                            >
                                                Start Quiz
                                            </Link>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header={[{ name: "Quizzes" }]}>
        {page}
    </AuthenticatedLayout>
);

export default Index;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { CheckCircle2, Award, Calendar } from "lucide-react";
import { Progress } from "@/Components/ui/progress";

interface Result {
    score: number;
    total_questions: number;
    percentage: number;
    attempt_date: string;
    quiz: {
        id: number;
        title: string;
        description: string;
    };
}

interface Props extends PageProps {
    result: Result;
}

function Result({ result }: Props) {
    const getGradeMessage = (percentage: number) => {
        if (percentage >= 90)
            return { message: "Excellent!", color: "text-green-600" };
        if (percentage >= 75)
            return { message: "Great job!", color: "text-blue-600" };
        if (percentage >= 60)
            return { message: "Good effort!", color: "text-yellow-600" };
        return { message: "Keep practicing!", color: "text-orange-600" };
    };

    const grade = getGradeMessage(result.percentage);

    return (
        <>
            <Head title="Quiz Result" />
            <div className="space-y-6 max-w-2xl mx-auto">
                <Card className="border-2">
                    <CardHeader className="text-center space-y-4 pb-8">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold">
                                Quiz Completed!
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {result.quiz.title}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="text-6xl font-bold text-primary">
                                {result.score}/{result.total_questions}
                            </div>
                            <p className="text-2xl font-semibold">
                                {result.percentage.toFixed(0)}%
                            </p>
                            <p className={`text-xl font-medium ${grade.color}`}>
                                {grade.message}
                            </p>
                        </div>

                        <Progress value={result.percentage} className="h-3" />

                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Award className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Score
                                            </p>
                                            <p className="text-xl font-bold">
                                                {result.score} correct
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Completed
                                            </p>
                                            <p className="text-sm font-medium">
                                                {result.attempt_date}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1" asChild>
                                <Link href={route("quizzes.index")}>
                                    Back to Quizzes
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                asChild
                            >
                                <Link href={route("dashboard")}>
                                    Go to Dashboard
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {result.quiz.description && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">
                                About this quiz
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {result.quiz.description}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

Result.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Quizzes", link: route("quizzes.index") },
            { name: "Result" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);

export default Result;

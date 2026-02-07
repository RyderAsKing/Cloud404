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
import { CircleUserRound, Mail, Plus, BookOpen } from "lucide-react";
import { Button } from "@/Components/ui/button";

function Dashboard({ auth }: PageProps) {
    const isAdmin = auth.user.roles.some((role) => role.name === "admin");

    return (
        <>
            <Head title="Dashboard" />
            <div className="space-y-6">
                <Card className="w-full">
                    <CardHeader className="text-center space-y-6 pb-8">
                        <div className="flex justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                                <CircleUserRound className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold">
                                Welcome back!
                            </CardTitle>
                            <CardDescription className="text-xl">
                                You are logged in as{" "}
                                <span className="font-semibold text-primary">
                                    {auth.user.name}
                                </span>
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>{auth.user.email}</span>
                        </div>
                    </CardContent>
                </Card>

                {isAdmin ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Quiz Management</CardTitle>
                            <CardDescription>
                                Create and manage quizzes for students
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Button asChild>
                                <Link href={route("admin.quizzes.create")}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create New Quiz
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={route("admin.quizzes.index")}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    View All Quizzes
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Quizzes</CardTitle>
                            <CardDescription>
                                Take quizzes and view your results
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href={route("quizzes.index")}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Browse Quizzes
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout header={[{ name: "Dashboard" }]}>
        {page}
    </AuthenticatedLayout>
);

export default Dashboard;

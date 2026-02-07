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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Plus, Eye, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

interface Quiz {
    id: number;
    title: string;
    description: string;
    duration_minutes: number;
    questions_count: number;
    creator: {
        name: string;
    };
    created_at: string;
}

interface Props extends PageProps {
    quizzes: Quiz[];
}

function Index({ quizzes }: Props) {
    const handleDelete = (quizId: number) => {
        if (confirm("Are you sure you want to delete this quiz?")) {
            router.delete(route("admin.quizzes.destroy", quizId));
        }
    };

    return (
        <>
            <Head title="Manage Quizzes" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Quizzes
                        </h2>
                        <p className="text-muted-foreground">
                            Manage all quizzes in the system
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("admin.quizzes.create")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Quiz
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Quizzes</CardTitle>
                        <CardDescription>
                            A list of all quizzes created in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {quizzes.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">
                                    No quizzes created yet
                                </p>
                                <Button asChild>
                                    <Link href={route("admin.quizzes.create")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Your First Quiz
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Questions</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Creator</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quizzes.map((quiz) => (
                                        <TableRow key={quiz.id}>
                                            <TableCell className="font-medium">
                                                {quiz.title}
                                            </TableCell>
                                            <TableCell>
                                                {quiz.questions_count}
                                            </TableCell>
                                            <TableCell>
                                                {quiz.duration_minutes} min
                                            </TableCell>
                                            <TableCell>
                                                {quiz.creator.name}
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "admin.quizzes.show",
                                                            quiz.id,
                                                        )}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(quiz.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => (
    <AuthenticatedLayout
        header={[
            { name: "Admin", link: route("dashboard") },
            { name: "Quizzes" },
        ]}
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;

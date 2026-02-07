import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    CheckCircle2,
    Github,
    Globe,
    Layers,
    Lock,
    Shield,
    Zap,
} from "lucide-react";

const features = [
    {
        name: "Automatic Evaluation",
        description: "Instant quiz grading with automatic score calculation",
        icon: Zap,
    },
    {
        name: "Role-Based Access",
        description:
            "Separate admin and student dashboards with secure permissions",
        icon: Shield,
    },
    {
        name: "Interactive Quizzes",
        description: "Modern quiz-taking interface with progress tracking",
        icon: CheckCircle2,
    },
    {
        name: "Admin Dashboard",
        description: "Create and manage quizzes with detailed analytics",
        icon: Layers,
    },
];

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col">
                <header className="border-b">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden ">
                                <img
                                    src="/assets/logo1.svg"
                                    alt="Cloud_404"
                                    className="h-10 w-10"
                                />
                            </div>
                            <span className="text-xl font-semibold">
                                Cloud_404
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Button asChild>
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href={route("login")}>
                                            Sign in
                                        </Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={route("register")}>
                                            Get started
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main>
                    {/* Hero Section */}
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="mx-auto max-w-3xl py-24 sm:py-32">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl ">
                                    <span className="text-primary">
                                        Cloud_404
                                    </span>
                                    <br />
                                    <span className="text-3xl sm:text-5xl">
                                        Quiz Management System
                                    </span>
                                </h1>

                                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                    A modern cloud-based platform for creating,
                                    managing, and taking quizzes. Perfect for
                                    educators and students with automatic
                                    grading and real-time results.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Button size="lg" asChild>
                                        <Link href={route("register")}>
                                            Start Taking Quizzes
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={route("login")}>
                                            Sign In
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

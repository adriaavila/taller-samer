import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-10 w-10", className)}
            aria-label="Taller app"
        >
            {/* Outer Hexagon - Dark Foundation */}
            <path
                d="M50 0L95 26V74L50 100L5 74V26L50 0Z"
                className="fill-zinc-900"
            />

            {/* Stylized Wrench Tool - Negative Space - Diagonal */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M62 25L75 38L52 61L55 64L51 68L48 65L39 74C37.34 75.66 34.66 75.66 33 74L26 67C24.34 65.34 24.34 62.66 26 61L35 52L32 49L36 45L39 48L62 25ZM65 28L68 31L65 34L62 31L65 28Z"
                fill="white"
            />

            {/* Handle extension / Tech Line */}
            <path
                d="M69 32L85 48"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
            />

            {/* Accent Dot */}
            <circle
                cx="31"
                cy="69"
                r="2"
                fill="white"
            />
        </svg>
    );
}

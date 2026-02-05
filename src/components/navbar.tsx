"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    LayoutDashboard,
    Clock,
    ClipboardList,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/log-hours", label: "Registrar", icon: Clock },
    { href: "/pending", label: "Pendientes", icon: ClipboardList },
    { href: "/admin", label: "Admin", icon: Settings },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Navigation (Top-ish) */}
            <nav className="hidden border-b border-zinc-200 bg-zinc-50/50 sm:block">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-12 items-center gap-8">
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative flex h-full items-center text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-zinc-900"
                                            : "text-zinc-500 hover:text-zinc-900"
                                    )}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-zinc-900" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation (Bottom) */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/90 pb-safe backdrop-blur-lg sm:hidden">
                <div className="grid grid-cols-5 items-center">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1.5 py-3 transition-colors",
                                    isActive
                                        ? "text-zinc-900"
                                        : "text-zinc-400 hover:text-zinc-600"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "h-5 w-5",
                                        isActive && "stroke-[2.5px]"
                                    )}
                                />
                                <span className={cn("text-[10px] font-semibold uppercase tracking-wider", isActive ? "text-zinc-900" : "text-zinc-400")}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

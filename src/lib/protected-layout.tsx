import React, { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated.tsx";
import { Navigate, Outlet } from "@tanstack/react-router";

interface ProtectedLayoutProps {
    children?: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useIsAuthenticated();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Skeleton className="h-10 w-32" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children || <Outlet />}</>;
};

export default ProtectedLayout;

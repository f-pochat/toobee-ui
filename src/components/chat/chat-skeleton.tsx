import {Skeleton} from "@/components/ui/skeleton.tsx";

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between px-4 py-4 border-b">
                <Skeleton className="h-6 w-24" />
                <div className="flex items-center px-2 gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-12" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary">
                <div className="flex items-end space-x-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
                <div className="flex items-end space-x-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-40 rounded-lg" />
                </div>
                <div className="flex items-end justify-end space-x-2">
                    <Skeleton className="h-10 w-40 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="flex items-end justify-end space-x-2">
                    <Skeleton className="h-10 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </div>
            <div className="flex items-center space-x-2 p-8 bg-secondary">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 w-16 rounded-lg" />
            </div>
        </div>
    );
};

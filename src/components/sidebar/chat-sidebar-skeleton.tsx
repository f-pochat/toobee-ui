import { Skeleton } from "@/components/ui/skeleton";

export const ChatSidebarSkeleton = () => {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex-1 pt-2 px-2">
                <div className="flex flex-col gap-2">
                    {/* Search Skeleton */}
                    <Skeleton className="h-10 w-full" />

                    {/* Chat list skeleton */}
                    <div className="flex flex-col gap-2">
                        {[...Array(5)].map((_, index) => (
                            <a
                                key={index}
                                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent"
                            >
                                {/* Chat name, phone number, and message skeletons */}
                                <div className="flex w-full items-center gap-2">
                                    <Skeleton className="h-5 w-1/2" /> {/* Chat name */}
                                    <Skeleton className="h-3 w-16 ml-auto" /> {/* Date */}
                                </div>
                                <div className="flex w-full items-center gap-2">
                                    <Skeleton className="h-3 w-24" /> {/* Phone number */}
                                </div>
                                <Skeleton className="h-4 w-full" /> {/* Last message */}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

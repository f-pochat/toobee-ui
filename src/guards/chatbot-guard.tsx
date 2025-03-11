import { Navigate } from '@tanstack/react-router';
import {useGetChatbots} from "@/hooks/use-get-chatbots.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";



export const ChatbotGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: chatbots, isLoading } = useGetChatbots();
    if (isLoading) {
        return (
            <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center bg-white">
                <Spinner />
            </div>
        );
    }
    if (!chatbots || chatbots.length === 0) {
        return <Navigate to="/init-chatbot" />;
    }
    return <>{children}</>;
};


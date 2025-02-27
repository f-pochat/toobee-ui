import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {useGetChatbots} from "@/hooks/use-get-chatbots.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

export const ChatbotGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: chatbots, isLoading } = useGetChatbots();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoading && (!chatbots || chatbots.length === 0)) {
            navigate({ to: '/init-chatbot' });
        }
    }, [chatbots, isLoading, navigate]);

    if (isLoading || !chatbots) {
        return(
            <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center bg-white">
                <Spinner/>;
            </div>
        )
    }
            return <>{children}</>;
            };

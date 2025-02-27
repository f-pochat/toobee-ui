import React, { ReactNode } from "react";
import { useGetChatbots } from "@/hooks/use-get-chatbots.tsx";
import { Navigate } from "@tanstack/react-router";

interface ChatbotGuardProps {
    children?: ReactNode;
}

export const ChatbotGuard: React.FC<ChatbotGuardProps> = ({ children }) => {
    const { data: chatbots } = useGetChatbots();

    // If no chatbots are available, navigate to the init page
    if (chatbots && chatbots.length === 0) {
        return <Navigate to="/init-chatbot" replace />;
    }

    // Render children if chatbots are available
    return <>{children}</>;
};

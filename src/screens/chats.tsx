import {Chat} from "@/components/chat";
import {ChatSidebar} from "@/components/sidebar/chat-sidebar.tsx";
import {useEffect} from "react";
import {useNavigate} from "@tanstack/react-router";

export const ChatsScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                navigate({
                    to: "/chats"
                })
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <ChatSidebar>
            <Chat />
        </ChatSidebar>
    )
}
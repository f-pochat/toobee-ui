import {Chat} from "@/components/chat";
import {ChatSidebar} from "@/components/sidebar/chat-sidebar.tsx";

export const ChatsScreen = () => {
    return (
        <ChatSidebar>
            <Chat />
        </ChatSidebar>
    )
}
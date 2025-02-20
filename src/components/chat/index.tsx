import {useChatId} from "@/hooks/use-chat-id.tsx";
import {ChatMessages} from "@/components/chat/ChatMessages.tsx";

export const Chat = () => {
    const chatId = useChatId()

    return !chatId ? (
        <div className="flex items-center justify-center h-screen bg-secondary">
            <h1 className="text-lg font-semibold">
                No chat selected. Please select a chat to start messaging.
            </h1>
        </div>
    ) : (
        <ChatMessages chatId={chatId}/>
    )
}
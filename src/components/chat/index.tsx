import {useChatId} from "@/hooks/use-chat-id.tsx";
import {ChatMessages} from "@/components/chat/chat-messages.tsx";
import {useTranslation} from "react-i18next";

export const Chat = () => {
    const chatId = useChatId();
    const {t} = useTranslation();

    return !chatId ? (
        <div className="flex items-center justify-center w-full bg-secondary">
            <h1 className="text-lg font-semibold">
                {t("chats.fallback")}
            </h1>
        </div>
    ) : (
        <ChatMessages chatId={chatId}/>
    )
}
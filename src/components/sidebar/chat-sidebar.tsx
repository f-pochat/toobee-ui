import {useGetChats} from "@/hooks/use-get-chats.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ReactNode} from "react";

const parseDate = (date: string): string => {
    const now = new Date();
    const inputDate = new Date(date);

    // Normalize times to compare dates correctly
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate >= today) {
        // Message is from today, return HH:mm format
        return inputDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    } else if (inputDate >= yesterday) {
        // Message is from yesterday
        return "Yesterday";
    } else {
        // Message is older than yesterday, return dd/mm/yyyy
        return inputDate.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
    }
};

export const ChatSidebar = ({children}: { children: ReactNode }) => {
    const {chatId: selectedChatId} = {chatId: "some"}

    const chatbot_id = localStorage.getItem("active_chatbot_id");
    const {data: chats, isLoading} = useGetChats(chatbot_id ?? undefined);
    return (
        <div className="flex flex-row h-screen">
            <div className="w-[24rem] pt-2 px-2">
                <div className="flex flex-col gap-2">
                    <Input placeholder="Type to search..."/>
                    {
                        isLoading || !chats ?
                            <Skeleton/>
                            :
                            <div>
                                {chats.map((chat) => (
                                    <a
                                        href={`#${chat.id}`}
                                        key={chat.name}
                                        className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                                            chat.id === selectedChatId ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                                        }`}
                                    >
                                        <div className="flex w-full items-center gap-2">
                                            <h3 className="font-bold">{chat.name}</h3>
                                            <span className="ml-auto text-xs">{parseDate(chat.last_message_date)}</span>
                                        </div>
                                        <div className="flex w-full items-center gap-2">
                                            <span>{chat.phone_number}</span>{" "}
                                        </div>
                                        <span className="line-clamp-2 w-full whitespace-break-spaces text-xs">
                                                {chat.last_message}
                                    </span>
                                    </a>
                                ))}
                            </div>
                    }
                </div>
            </div>
            {children}
        </div>
    )
}


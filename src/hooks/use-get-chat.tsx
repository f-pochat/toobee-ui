import {ChatWithMessages} from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";


export const useGetChat = (chat_id: string) => {
    return useQuery<ChatWithMessages, Error>({
        queryFn: () => getChatMessages(chat_id),
        queryKey: ["chat-messages", chat_id],
    });
};

const getChatMessages = async (chat_id: string): Promise<ChatWithMessages> => {
    const res = await request.get(`${API_URL}/configuration/chat/${chat_id}`)
    return res.body;
};
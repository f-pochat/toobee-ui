import {ChatWithMessages} from "@/types.ts";
import * as superagent from "superagent";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";

const cookies = new Cookies();

const getChatMessages = async (chat_id: string): Promise<ChatWithMessages> => {
    const res = await superagent.get(`http://localhost:8000/configuration/chat/${chat_id}`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken"),
        });
    return res.body;
};

export const useGetChat = (chat_id: string) => {
    return useQuery<ChatWithMessages, Error>({
        queryFn: () => getChatMessages(chat_id),
        queryKey: ["chat-messages", chat_id],
    });
};
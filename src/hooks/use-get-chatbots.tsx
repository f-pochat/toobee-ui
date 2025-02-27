import {useQuery} from "@tanstack/react-query";
import {Chatbot} from "@/types.ts";

import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

export const useGetChatbots = () => {
    //TODO add userId to the key
    return useQuery<Chatbot[], Error, Chatbot[]>({
        queryFn: getChatbots,
        queryKey: ['chatbots']
    })
}

const getChatbots = async (): Promise<Chatbot[]> => {
    const res = await request.get(`${API_URL}/configuration/chatbots`)
    return res.body
}
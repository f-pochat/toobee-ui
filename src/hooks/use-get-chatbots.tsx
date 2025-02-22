import {useQuery} from "@tanstack/react-query";
import {Chatbot} from "@/types.ts";

import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

const cookies = new Cookies();


export const useGetChatbots = () => {
    const user_id = cookies.get("user_id");
    return useQuery<Chatbot[], Error, Chatbot[]>({
        queryFn: getChatbots,
        queryKey: ['chatbots', user_id]
    })
}

const getChatbots = async (): Promise<Chatbot[]> => {
    const res = await request.get(`${API_URL}/configuration/chatbots`)
    return res.body
}
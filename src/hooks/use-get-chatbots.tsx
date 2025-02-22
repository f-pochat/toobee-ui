import {useQuery} from "@tanstack/react-query";
import * as superagent from "superagent";
import {Chatbot} from "@/types.ts";

import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();


export const useGetChatbots = () => {
    const user_id = cookies.get("user_id");
    return useQuery<Chatbot[], Error, Chatbot[]>({
        queryFn: getChatbots,
        queryKey: ['chatbots', user_id]
    })
}

const getChatbots = async (): Promise<Chatbot[]> => {
    const res = await superagent.get(`${API_URL}/configuration/chatbots`)
        .withCredentials()
        .set({
        "X-CSRFToken": cookies.get("csrftoken")
    });
    return res.body
}
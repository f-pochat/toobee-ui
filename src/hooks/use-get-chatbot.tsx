import {useQuery} from "@tanstack/react-query";
import * as superagent from "superagent";
import {Chatbot} from "@/types.ts";

import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();

export const useGetChatbot = (id?: string) => {
    const query = useQuery<Chatbot, Error, Chatbot>({
        queryFn: () => getChatbot(id),
        queryKey: ['chatbot', id],
    })

    return query
}

const getChatbot = async (id?: string): Promise<Chatbot> => {
    const res = await superagent.get(`${API_URL}/configuration/chatbot/${id ?? localStorage.getItem('active_chatbot_id')}`)
        .withCredentials()
        .set({
        "X-CSRFToken": cookies.get("csrftoken")
    });
    return res.body
}
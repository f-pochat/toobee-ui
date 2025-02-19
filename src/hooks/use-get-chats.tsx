import {useQuery} from "@tanstack/react-query";
import * as superagent from "superagent";
import {Chat} from "@/types.ts";

import Cookies from "universal-cookie";
import {useEffect} from "react";

const cookies = new Cookies();

type Options = {
    onSuccess?: (data: Chat[]) => void;
}

export const useGetChats = (chatbot_id: string = "338c51dc-8a82-4108-b32c-b2beb639905", options?: Options) => {
    const query = useQuery<Chat[], Error, Chat[]>({
        queryFn: () => getChats(chatbot_id),
        queryKey: ['chatbots'],
        ...options
    })

    useEffect(() => {
        if (query.isSuccess && options?.onSuccess) {
            options?.onSuccess(query.data)
        }
    }, [options, query.data, query.isSuccess]);

    return query
}

const getChats = async (chatbot_id: string): Promise<Chat[]> => {
    const res = await superagent.get(`http://localhost:8000/configuration/chats/${chatbot_id}`)
        .withCredentials()
        .set({
        "X-CSRFToken": cookies.get("csrftoken")
    });
    return res.body
}
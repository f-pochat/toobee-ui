import {useQuery} from "@tanstack/react-query";
import * as superagent from "superagent";
import {Chatbot} from "@/types.ts";

import Cookies from "universal-cookie";
import {useEffect} from "react";

const cookies = new Cookies();

type Options = {
    onSuccess?: (data: Chatbot[]) => void;
}

export const useGetChatbots = (options: Options) => {
    const user_id = cookies.get("user_id");
    const query = useQuery<Chatbot[], Error, Chatbot[]>({
        queryFn: getChatbots,
        queryKey: ['chatbots', user_id],
        ...options
    })

    useEffect(() => {
        if (query.isSuccess && options?.onSuccess) {
            options?.onSuccess(query.data)
        }
    }, [options, query.data, query.isSuccess]);

    return query
}

const getChatbots = async (): Promise<Chatbot[]> => {
    const res = await superagent.get('http://localhost:8000/configuration/chatbots')
        .withCredentials()
        .set({
        "X-CSRFToken": cookies.get("csrftoken")
    });
    return res.body
}
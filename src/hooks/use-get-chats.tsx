import {useQuery} from "@tanstack/react-query";
import {Chat} from "@/types.ts";

import {useEffect} from "react";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

type Options = {
    onSuccess?: (data: Chat[]) => void;
}

export const useGetChats = (chatbot_id: string = "338c51dc-8a82-4108-b32c-b2beb639905a", options?: Options) => {
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
    const res = await request.get(`${API_URL}/configuration/chats/${chatbot_id}`)
    return res.body
}
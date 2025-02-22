import {useQuery} from "@tanstack/react-query";
import {Chatbot} from "@/types.ts";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";


export const useGetChatbot = (id?: string) => {
    return useQuery<Chatbot, Error, Chatbot>({
        queryFn: () => getChatbot(id),
        queryKey: ['chatbot', id],
    })
}

const getChatbot = async (id?: string): Promise<Chatbot> => {
    const res = await request.get(`${API_URL}/configuration/chatbot/${id ?? localStorage.getItem('active_chatbot_id')}`)
    return res.body
}
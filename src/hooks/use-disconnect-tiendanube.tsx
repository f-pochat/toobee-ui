import {MutationOptions, useMutation} from "@tanstack/react-query";
import { request } from "@/request.ts";
import {API_URL} from "@/constants.ts";

interface DisconnectTiendanubeParams {
    chatbotId?: string;
}

export const useDisconnectTiendanube = (options?: MutationOptions<object, Error, DisconnectTiendanubeParams>) => {
    return useMutation<object, Error, { chatbotId?: string }>({
        mutationFn: disconnectTiendanube,
        ...options
    });
}

const disconnectTiendanube = async ({ chatbotId }: DisconnectTiendanubeParams): Promise<object> => {
    const res = await request.post(`${API_URL}/tiendanube/disconnect/${chatbotId || localStorage.getItem('active_chatbot_id')}`);
    return res.body;
};
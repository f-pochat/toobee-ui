import {MutationOptions, useMutation} from "@tanstack/react-query";
import { API_URL } from "@/constants.ts";
import { request } from "@/request.ts";

interface ConfigureTiendanubeParams {
    chatbotId?: string;
    code: string,
}

export const useConfigureTiendanube = (options?: MutationOptions<object, Error, ConfigureTiendanubeParams>) => {
    return useMutation<object, Error, ConfigureTiendanubeParams>({
        mutationFn: configureTiendanube,
        ...options
    });
};

const configureTiendanube = async ({ chatbotId, code }: ConfigureTiendanubeParams): Promise<object> => {
    const res = await request.post(`${API_URL}/tiendanube/configuration/`, {
        chatbot_configuration_id: chatbotId || localStorage.getItem('active_chatbot_id'),
        code
    });

    return res.body;
};

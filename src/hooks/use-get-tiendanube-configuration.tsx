
import { useQuery } from "@tanstack/react-query";
import {TiendanubeConfiguration} from "@/types.ts";  // Assuming Maintainer is a type for the maintainers object

import { API_URL } from "@/constants.ts";
import { request } from "@/request.ts";

export const useGetTiendanubeConfiguration = (chatbotId?: string) => {
    return useQuery<TiendanubeConfiguration, Error, TiendanubeConfiguration>({
        queryFn: () => getTiendanubeConfiguration(chatbotId),
        queryKey: ['tiendanube-configuration', chatbotId]
    });
}

const getTiendanubeConfiguration = async (chatbotId?: string): Promise<TiendanubeConfiguration> => {
    const res = await request.get(`${API_URL}/tiendanube/configuration/${chatbotId ?? localStorage.getItem('active_chatbot_id')}`);
    return res.body;
}

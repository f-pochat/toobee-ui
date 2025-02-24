import { useQuery } from "@tanstack/react-query";
import { Maintainer } from "@/types.ts";  // Assuming Maintainer is a type for the maintainers object

import { API_URL } from "@/constants.ts";
import { request } from "@/request.ts";

export const useGetMaintainers = (chatbotId?: string) => {
    return useQuery<Maintainer[], Error, Maintainer[]>({
        queryFn: () => getMaintainers(chatbotId),  // The function that fetches the maintainers
        queryKey: ['maintainers', chatbotId]  // Unique key for cache
    });
}

const getMaintainers = async (chatbotId?: string): Promise<Maintainer[]> => {
    const res = await request.get(`${API_URL}/maintainers/${chatbotId ?? localStorage.getItem('active_chatbot_id')}`);
    return res.body;
}

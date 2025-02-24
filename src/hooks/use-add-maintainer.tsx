import { MutationOptions, useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constants.ts";
import { request } from "@/request.ts";

interface AddMaintainerParams {
    username: string;
    chatbotId?: string;
}

export const useAddMaintainer = (options?: MutationOptions<object, Error, AddMaintainerParams>) => {
    return useMutation<object, Error, AddMaintainerParams>({
        mutationFn: addMaintainer,
        ...options
    });
};

const addMaintainer = async ({ username,chatbotId }: AddMaintainerParams): Promise<object> => {
    const res = await request.post(`${API_URL}/add-maintainer/${chatbotId ?? localStorage.getItem('active_chatbot_id')}`, {
        username
    });
    return res.body;
};

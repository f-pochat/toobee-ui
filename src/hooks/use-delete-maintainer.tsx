import { MutationOptions, useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constants.ts";
import { request } from "@/request.ts";

interface DeleteMaintainerParams {
    userId: string;
    chatbotId?: string;
}

export const useDeleteMaintainer = (options?: MutationOptions<object, Error, DeleteMaintainerParams>) => {
    return useMutation<object, Error, DeleteMaintainerParams>({
        mutationFn: deleteMaintainer,
        ...options
    });
};

const deleteMaintainer = async ({ userId, chatbotId }: DeleteMaintainerParams): Promise<object> => {
    const res = await request.delete(`${API_URL}/delete-maintainer/${chatbotId ?? localStorage.getItem('active_chatbot_id')}/${userId}`);
    return res.body;
};

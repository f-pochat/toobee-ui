import {MutationOptions, useMutation} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

interface UpdateChatbotParams {
    name?: string;
    system_message?: string;
    whatsapp_client_id?: string;
    whatsapp_client_secret?: string;
    phone_number_id?: string;
    temperature?: number;
    tone?: string;
}

export const useUpdateChatbot = (options?: MutationOptions<UpdateChatbotParams, Error, UpdateChatbotParams>) => {
    return useMutation<UpdateChatbotParams, Error, UpdateChatbotParams>({
        mutationFn: updateChatbot,
        onSuccess: options && options?.onSuccess,
    });
};

const updateChatbot = async ({ name, system_message, whatsapp_client_id, whatsapp_client_secret, phone_number_id, temperature, tone }: UpdateChatbotParams): Promise<object> => {
    const id = localStorage.getItem("active_chatbot_id");
    const res = await request
        .put(`${API_URL}/configuration/chatbot/${id}`
            , {
                name, system_message, whatsapp_client_id, whatsapp_client_secret, phone_number_id, temperature, tone
            })

    return res.body;
};

import {MutationOptions, useMutation} from "@tanstack/react-query";
import superagent from "superagent";
import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();

interface UpdateChatbotParams {
    name?: string;
    system_message?: string;
    whatsapp_client_id?: string;
    whatsapp_client_secret?: string;
    phone_number_id?: string;
}

export const useUpdateChatbot = (options?: MutationOptions<UpdateChatbotParams, Error, UpdateChatbotParams>) => {
    return useMutation<UpdateChatbotParams, Error, UpdateChatbotParams>({
        mutationFn: updateChatbot,
        onSuccess: options && options?.onSuccess,
    });
};

const updateChatbot = async ({ name, system_message, whatsapp_client_id, whatsapp_client_secret, phone_number_id }: UpdateChatbotParams): Promise<object> => {
    const id = localStorage.getItem("active_chatbot_id");
    const res = await superagent
        .put(`${API_URL}/configuration/chatbot/${id}`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken")
        }).send({
            name, system_message, whatsapp_client_id, whatsapp_client_secret, phone_number_id
        });

    return res.body;
};

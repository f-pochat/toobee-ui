import {MutationOptions, useMutation} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

 export interface CreateChatbotParams {
    name: string;
    system_message: string;
    whatsapp_client_id: string;
    whatsapp_client_secret: string;
    phone_number_id: string;
    permanent_access_token: string;
}

export const useCreateChatbot = (options?: MutationOptions<CreateChatbotParams, Error, CreateChatbotParams>) => {

    return useMutation<CreateChatbotParams, Error, CreateChatbotParams>({
        mutationFn: createChatbot,
        ...options
    });
};

const createChatbot = async ({
                                 name,
                                 system_message,
                                 whatsapp_client_id,
                                 whatsapp_client_secret,
                                 phone_number_id,
                                 permanent_access_token,
                             }: CreateChatbotParams): Promise<CreateChatbotParams> => {
    const res = await request.post(`${API_URL}/configuration/`, {
        name,
        system_message,
        whatsapp_client_id,
        whatsapp_client_secret,
        phone_number_id,
        permanent_access_token,
    });
    return res.body;
};



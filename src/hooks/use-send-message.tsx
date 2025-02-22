import {MutationOptions, useMutation} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";


interface SendMessageParams {
    chat_id: string;
    message: string;
}

export const useSendMessage = (options?: MutationOptions<object, Error, SendMessageParams>) => {
    return useMutation<object, Error, SendMessageParams>({
        mutationFn: setIsAiAnswered,
        ...options
    });
};

const setIsAiAnswered = async ({ chat_id, message }: SendMessageParams): Promise<object> => {
    const res = await request
        .post(`${API_URL}/configuration/send/${chat_id}`, {
            message
        })

    return res.body;
};

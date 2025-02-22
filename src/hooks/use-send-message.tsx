import {MutationOptions, useMutation} from "@tanstack/react-query";
import superagent from "superagent";
import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();

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
    const res = await superagent
        .post(`${API_URL}/configuration/send/${chat_id}`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken")
        }).send({
            message
        });

    return res.body;
};

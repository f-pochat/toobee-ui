import { useMutation } from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

interface SetIsAiAnsweredParams {
    chatId: string;
    isAiAnswered: boolean;
}

export const useSetIsAiAnswered = () => {
    return useMutation<object, Error, SetIsAiAnsweredParams>({
        mutationFn: setIsAiAnswered,
    });
};

const setIsAiAnswered = async ({ chatId, isAiAnswered }: SetIsAiAnsweredParams): Promise<object> => {
    const res = await request
        .post(`${API_URL}/configuration/set_ai_answered/${chatId}/${isAiAnswered}`)

    return res.body;
};

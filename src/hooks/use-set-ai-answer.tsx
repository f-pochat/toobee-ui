import { useMutation } from "@tanstack/react-query";
import superagent from "superagent";
import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();

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
    const res = await superagent
        .post(`${API_URL}/configuration/set_ai_answered/${chatId}/${isAiAnswered}`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken")
        });

    return res.body;
};

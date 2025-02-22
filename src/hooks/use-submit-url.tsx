import {MutationOptions, useMutation} from "@tanstack/react-query";
import superagent from "superagent";
import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();

interface SubmitURLParams {
    url: string;
}

export const useSubmitURL = (options?: MutationOptions<object, Error, SubmitURLParams>) => {
    return useMutation<object, Error, SubmitURLParams>({
        mutationFn: submitURL,
        ...options
    });
};

const submitURL = async ({ url }: SubmitURLParams): Promise<object> => {
    const id = localStorage.getItem("active_chatbot_id")
    const res = await superagent
        .post(`${API_URL}/configuration/submit_url`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken")
        }).send({
            chatbot_configuration_id: id,
            url
        })

    return res.body;
};

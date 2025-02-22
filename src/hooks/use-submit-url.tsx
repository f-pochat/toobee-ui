import {MutationOptions, useMutation} from "@tanstack/react-query";
import superagent from "superagent";
import Cookies from "universal-cookie";

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
        .post(`http://localhost:8000/configuration/submit_url`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken")
        }).send({
            chatbot_configuration_id: id,
            url
        })

    return res.body;
};

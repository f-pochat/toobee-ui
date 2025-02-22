import {MutationOptions, useMutation} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";


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
    const res = await request
        .post(`${API_URL}/configuration/submit_url`, {
            chatbot_configuration_id: id,
            url
        })

    return res.body;
};

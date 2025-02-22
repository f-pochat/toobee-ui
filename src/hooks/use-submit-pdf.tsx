import {MutationOptions, useMutation} from "@tanstack/react-query";
import superagent, {MultipartValueSingle} from "superagent";
import Cookies from "universal-cookie";
import {API_URL} from "@/constants.ts";

const cookies = new Cookies();

interface SubmitPDFParams {
    pdf: File;
}

export const useSubmitPDF = (options?: MutationOptions<object, Error, SubmitPDFParams>) => {
    return useMutation<object, Error, SubmitPDFParams>({
        mutationFn: submitPDF,
        ...options
    });
};

const submitPDF = async ({ pdf }: SubmitPDFParams): Promise<object> => {
    const id = localStorage.getItem("active_chatbot_id")
    const res = await superagent
        .post(`${API_URL}/configuration/submit_pdf/${id}`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken")
        }).attach('pdf', pdf as unknown as MultipartValueSingle);

    return res.body;
};

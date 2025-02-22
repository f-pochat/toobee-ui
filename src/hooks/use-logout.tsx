import { useMutation } from "@tanstack/react-query";
import * as superagent from "superagent";
import {API_URL} from "@/constants.ts";

type Options = {
    onSuccess?: () => void;
};

export const useLogout = (options?: Options) => {
    return useMutation<void, Error>({
        mutationFn: logout,
        onSuccess: options?.onSuccess,
    });
};

const logout = async (): Promise<void> => {
    await superagent.post(`${API_URL}/logout`).withCredentials();
};

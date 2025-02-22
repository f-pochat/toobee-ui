import {useMutation} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

type Options = {
    onSuccess?: (d: LoginResponse) => void;
}

type LoginParams = {
    username: string;
    password: string;
}

type LoginResponse = {
    access: string;
    refresh: string;
}

export const useLogin = (options?: Options) => {
    return useMutation<LoginResponse, Error, LoginParams>({
        mutationFn: login,
        ...options
    })
}

const login = async (loginParams: LoginParams): Promise<LoginResponse> => {
    const res = await request.post(`${API_URL}/api/token/`, loginParams)
    return res.body
}
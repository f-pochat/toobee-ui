import {MutationOptions, useMutation} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";
import {HTTPError} from "superagent";

type LoginParams = {
    username: string;
    password: string;
}

type LoginResponse = {
    access: string;
    refresh: string;
}

export const useLogin = (options?: MutationOptions<LoginResponse, HTTPError, LoginParams>) => {
    return useMutation<LoginResponse, HTTPError, LoginParams>({
        mutationFn: login,
        ...options
    })
}

const login = async (loginParams: LoginParams): Promise<LoginResponse> => {
    const res = await request.post(`${API_URL}/api/token/`, loginParams)
    return res.body
}
import {useMutation} from "@tanstack/react-query";
import * as superagent from "superagent";

type Options = {
    onSuccess?: () => void;
}

type LoginParams = {
    username: string;
    password: string;
}

export const useLogin = (options?: Options) => {
    return useMutation<object, Error, LoginParams>({
        mutationFn: login,
        onSuccess: options?.onSuccess
    })
}

const login = async (loginParams: LoginParams): Promise<object> => {
    const res = await superagent.post('http://localhost:8000/login')
        .withCredentials()
        .send(loginParams);
    return res.body
}
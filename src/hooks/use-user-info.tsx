import { useQuery } from "@tanstack/react-query";
import {UserInfo} from "@/types.ts";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

export const useUserInfo = () => {
    return useQuery<UserInfo, Error>({
        queryKey: ["user-info"],
        queryFn: async () => {
            const res = await request.get(`${API_URL}/user-info`)
            return res.body;
        },
    });
};

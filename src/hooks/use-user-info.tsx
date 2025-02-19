import { useQuery } from "@tanstack/react-query";
import * as superagent from "superagent";
import {UserInfo} from "@/types.ts";

export const useUserInfo = () => {
    return useQuery<UserInfo, Error>({
        queryKey: ["user-info"],
        queryFn: async () => {
            const res = await superagent.get("http://localhost:8000/user-info").withCredentials();
            return res.body;
        },
    });
};

import { useQuery } from "@tanstack/react-query";
import * as superagent from "superagent";
import {UserInfo} from "@/types.ts";
import {API_URL} from "@/constants.ts";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const useUserInfo = () => {
    return useQuery<UserInfo, Error>({
        queryKey: ["user-info"],
        queryFn: async () => {
            const res = await superagent.get(`${API_URL}/user-info`)
                .withCredentials()
                .set({
                    "X-CSRFToken": cookies.get("csrftoken")
                });
            return res.body;
        },
    });
};

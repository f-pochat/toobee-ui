import { useQuery } from "@tanstack/react-query";
import * as superagent from "superagent";
import {API_URL} from "@/constants.ts";

export const useIsAuthenticated = () => {
    const { data: isAuthenticated, isLoading } = useQuery<boolean, Error>({
        queryKey: ["isAuthenticated"],
        queryFn: async () => {
            try {
                await superagent.get(`${API_URL}/user-info`).withCredentials();
                return true;
            } catch {
                return false;
            }
        },
    });

    return { isAuthenticated, isLoading };
};

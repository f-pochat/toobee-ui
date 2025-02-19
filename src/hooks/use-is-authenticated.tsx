import { useQuery } from "@tanstack/react-query";
import * as superagent from "superagent";

export const useIsAuthenticated = () => {
    const { data: isAuthenticated, isLoading } = useQuery<boolean, Error>({
        queryKey: ["isAuthenticated"],
        queryFn: async () => {
            try {
                await superagent.get("http://localhost:8000/user-info").withCredentials();
                return true;
            } catch {
                return false;
            }
        },
    });

    return { isAuthenticated, isLoading };
};

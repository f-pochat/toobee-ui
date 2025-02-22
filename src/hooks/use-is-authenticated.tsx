import { useQuery } from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

export const useIsAuthenticated = () => {
    const { data: isAuthenticated, isLoading } = useQuery<boolean, Error>({
        queryKey: ["isAuthenticated"],
        queryFn: async () => {
            try {
                await request.get(`${API_URL}/user-info`)
                return true;
            } catch {
                return false;
            }
        },
    });

    return { isAuthenticated, isLoading };
};

import { useQuery } from "@tanstack/react-query";
import {DataSource} from "@/types.ts";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";

export const useGetDataSources = (chatbot_id?: string) => {
    return useQuery<DataSource[], Error>({
        queryFn: () => getDataSources(chatbot_id),
        queryKey: ["data-sources", chatbot_id],
    });
};

const getDataSources = async (chatbot_id?: string): Promise<DataSource[]> => {
    const res = await request.get(`${API_URL}/configuration/data_sources/${chatbot_id ?? localStorage.getItem('active_chatbot_id')}`)
    return res.body;
};
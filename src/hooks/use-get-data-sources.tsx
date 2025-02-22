import * as superagent from "superagent";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import {DataSource} from "@/types.ts";

const cookies = new Cookies();

const getDataSources = async (chatbot_id?: string): Promise<DataSource[]> => {
    const res = await superagent.get(`http://localhost:8000/configuration/data_sources/${chatbot_id ?? localStorage.getItem('active_chatbot_id')}`)
        .withCredentials()
        .set({
            "X-CSRFToken": cookies.get("csrftoken"),
        });
    return res.body;
};

export const useGetDataSources = (chatbot_id?: string) => {
    return useQuery<DataSource[], Error>({
        queryFn: () => getDataSources(chatbot_id),
        queryKey: ["data-sources", chatbot_id],
    });
};
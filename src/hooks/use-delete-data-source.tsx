import {MutationOptions, useMutation, useQueryClient} from "@tanstack/react-query";
import {API_URL} from "@/constants.ts";
import {request} from "@/request.ts";


interface DeleteDataSourceParams {
  dataSourceId: string;
}

export const useDeleteDataSource = (options?: MutationOptions<object, Error, DeleteDataSourceParams>) => {
  const chatbot_id = localStorage.getItem("chatbot_id")
  const queryClient = useQueryClient();
  return useMutation<object, Error, DeleteDataSourceParams>({
    mutationFn: deleteDataSource,
    onMutate: async () => {
      await queryClient.invalidateQueries({queryKey: ["data-sources", chatbot_id]});
    },
    ...options
  });
};

const deleteDataSource = async ({ dataSourceId }: DeleteDataSourceParams): Promise<object> => {
  const res = await request
    .post(`${API_URL}/configuration/delete_data_source/${dataSourceId}`)
  return res.body;
};
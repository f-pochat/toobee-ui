import Dropzone from "shadcn-dropzone";
import {Badge} from "@/components/ui/badge.tsx";
import {CircleX} from "lucide-react";
import {useSubmitPDF} from "@/hooks/use-submit-pdf.tsx";
import {useGetDataSources} from "@/hooks/use-get-data-sources.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {DataSource} from "@/types.ts";

export const DataSourceScreen = () => {
    const queryClient = useQueryClient();
    const chatbot_id = localStorage.getItem("chatbot_id")
    const {mutateAsync: uploadPDF} = useSubmitPDF({
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: ['data-sources', chatbot_id] })

            const previous = queryClient.getQueryData(['data-sources', chatbot_id])

            queryClient.setQueryData(['data-sources', chatbot_id], (oldData: DataSource[]) => ([
                ...oldData,
                {
                    id: new Date().toISOString(),
                    name: data.pdf.name,
                    type: "PDF",
                    status: "FETCHED"
                }
            ]));

            return { previous }
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['data-sources', localStorage.getItem("active_chatbot_id")], (context as { previous: DataSource[] }).previous)
        },
        onSettled: async() => {
            await queryClient.invalidateQueries({ queryKey: ['data-sources', localStorage.getItem("active_chatbot_id")] })
        },
    });
    const {data: dataSources} = useGetDataSources();
    return (
        <div className="p-10">
            <h2>
                PDF Sources
            </h2>
            <div className="p-2 flex flex-col gap-2">
                <Dropzone
                    dropZoneClassName="h-[100px]"
                    multiple={false}
                    accept={{
                        'application/pdf': ['.pdf']
                    }}
                    onDrop={async (files) => {
                        await uploadPDF({pdf: files[0]})
                    }}
                />
                <div className="flex gap-2 flex-wrap">
                    {
                        dataSources?.filter((d) => d.type === "PDF").map((d) => (
                            <Badge variant="secondary" className="flex justify-between gap-1 py-2">
                                {d.name}
                                <CircleX size={16} className="cursor-pointer"/>
                            </Badge>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
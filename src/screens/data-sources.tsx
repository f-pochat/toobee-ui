import Dropzone from "shadcn-dropzone";
import {Badge} from "@/components/ui/badge.tsx";
import {Check, CircleX, Trash, Upload} from "lucide-react";
import {useSubmitPDF} from "@/hooks/use-submit-pdf.tsx";
import {useGetDataSources} from "@/hooks/use-get-data-sources.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {DataSource} from "@/types.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "react-i18next";
import {Input} from "@/components/ui/input.tsx";
import {useSubmitURL} from "@/hooks/use-submit-url.tsx";
import {useEffect, useState} from "react";
import {TiendanubeConfiguration} from "@/components/data-sources/tiendanube-configuration.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export const DataSourceScreen = () => {
    const {t} = useTranslation();
    const queryClient = useQueryClient();
    const chatbot_id = localStorage.getItem("chatbot_id")
    const {mutateAsync: uploadPDF} = useSubmitPDF({
        onMutate: async (data) => {
            await queryClient.cancelQueries({queryKey: ['data-sources', chatbot_id]})

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

            return {previous}
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['data-sources', localStorage.getItem("active_chatbot_id")], (context as {
                previous: DataSource[]
            }).previous)
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['data-sources', localStorage.getItem("active_chatbot_id")]})
        },
    });

    const {mutateAsync: uploadUrl} = useSubmitURL({
        onMutate: async (data) => {
            await queryClient.cancelQueries({queryKey: ['data-sources', chatbot_id]})

            const previous = queryClient.getQueryData(['data-sources', chatbot_id])

            queryClient.setQueryData(['data-sources', chatbot_id], (oldData: DataSource[]) => ([
                ...oldData,
                {
                    id: new Date().toISOString(),
                    name: data.url,
                    type: "URL",
                    status: "FETCHED"
                }
            ]));

            return {previous}
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['data-sources', localStorage.getItem("active_chatbot_id")], (context as {
                previous: DataSource[]
            }).previous)
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['data-sources', localStorage.getItem("active_chatbot_id")]})
        },
    });

    const [urls, setUrls] = useState<string[]>([]);

    const {data: dataSources} = useGetDataSources();

    useEffect(() => {
        setUrls(dataSources?.filter((d) => d.type === "URL").map(d => d.name) ?? []);
    }, [dataSources]);
    return (
        <Dialog>
            <div className="p-10 flex flex-col gap-4">
                <div>
                    <h2 className="p-2">
                        {t("data-sources.pdf")}
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
                        >
                            {() => (<div className="flex flex-row gap-4">
                                <Upload/>
                                {t("data-sources.upload")}
                            </div>)
                            }
                        </Dropzone>
                        <div className="flex gap-2 flex-wrap">
                            {
                                dataSources?.filter((d) => d.type === "PDF").map((d) => (
                                    <Badge key={d.id} variant="secondary" className="flex justify-between gap-1 py-2">
                                        {d.name}
                                        <DialogTrigger>
                                            <CircleX size={16} className="cursor-pointer"/>
                                        </DialogTrigger>
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Separator/>
                <div>
                    <h2 className="p-2">
                        {t("data-sources.urls")}
                    </h2>
                    <div className="p-2 flex flex-col gap-2">
                        {
                            urls?.map((d, index) => (
                                <div className="flex flex-row gap-2" key={index}>
                                    <Input
                                        value={d}
                                        onChange={(e) => {
                                            const newUrls = [...urls]; // Create a new array
                                            newUrls[index] = e.target.value; // Update the value at the specified index
                                            setUrls(newUrls); // Update state with the new array
                                        }}
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={dataSources?.filter((d) => d.type === "URL")[index]?.name === d}
                                        onClick={async () => await uploadUrl({url: urls[index]})}>
                                        <Check/>
                                    </Button>
                                    <DialogTrigger>
                                        <Button variant="outline" size="icon">
                                            <Trash color="red"/>
                                        </Button>
                                    </DialogTrigger>
                                </div>
                            ))
                        }
                        <Button onClick={() => setUrls([...urls, ""])}>{t("data-sources.add-url")}</Button>
                    </div>
                </div>
                <Separator/>
                <TiendanubeConfiguration />
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("common.are-you-sure")}</DialogTitle>
                    <DialogDescription>
                        {t("data-sources.delete-warning")}

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button>{t("common.confirm")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
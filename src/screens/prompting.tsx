import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useUpdateChatbot} from "@/hooks/use-update-chatbot.tsx";
import {useGetChatbot} from "@/hooks/use-get-chatbot.tsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const PromptingScreen = () => {
    const {data, isLoading} = useGetChatbot()
    const {t} = useTranslation();
    useEffect(() => {
        if (data) {
            setValue(data.system_message ?? "")
        }
    }, [data]);
    const [value, setValue] = useState<string>("");
    const {mutateAsync: updateChatbot, isPending} = useUpdateChatbot();
    return (
        <div className="flex flex-col p-10 gap-3">
            <div className="flex flex-row justify-between items-center">
                <h1>{t("sections.prompting")}</h1>
                <Button onClick={async () => await updateChatbot({system_message: value})} disabled={isPending || isLoading}>
                    {t("common.save-changes")}
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    {t("prompting.system-message")}
                </Label>
                <Textarea id="name" value={value} onChange={(val) => setValue(val.target.value)}
                          className="col-span-3 resize-none"/>
            </div>
        </div>
    )
}
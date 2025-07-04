import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useUpdateChatbot} from "@/hooks/use-update-chatbot.tsx";
import {useEffect, useState} from "react";
import {Chatbot} from "@/types.ts";
import {useGetChatbot} from "@/hooks/use-get-chatbot.tsx";
import {useQueryClient} from "@tanstack/react-query";
import Cookies from "universal-cookie";
import {useTranslation} from "react-i18next";
import {Maintainers} from "@/components/configuration/maintainers.tsx";

const cookies = new Cookies();

export const ConfigurationScreen = () => {
    const {t} = useTranslation();
    const {data: chatbot, isLoading} = useGetChatbot();
    const user_id = cookies.get("user_id");
    const queryClient = useQueryClient();
    const {mutateAsync: updateChatbot, isPending} = useUpdateChatbot({
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["chatbots", user_id]})
    });
    const [credentials, setCredentials] = useState<Partial<Chatbot>>({});

    useEffect(() => {
        if (chatbot && !isLoading) {
            setCredentials(chatbot)
        }
    }, [chatbot, isLoading])

    return (
        <div className="flex flex-col p-10 gap-4">
            <div className="flex flex-row justify-between items-center">
                <h1>{t("sections.configuration")}</h1>
                <Button
                    onClick={async () => await updateChatbot(credentials)}
                    disabled={isPending || isLoading || Object.keys(credentials).every((k) => chatbot?.[k as keyof Chatbot] === credentials?.[k as keyof Chatbot])}>
                    {t("common.save-changes")}
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    {t("configuration.name")}
                </Label>
                <Input id="name" value={credentials.name}
                       onChange={(e) => setCredentials({...credentials, name: e.target.value})} className="col-span-3"
                />
            </div>
            <Separator/>
            {/*<h2>{t("configuration.credentials")}</h2>*/}
            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
            {/*    <Label htmlFor="whatsapp-phone-id" className="text-right">*/}
            {/*        {t("configuration.phone-number-id")}*/}
            {/*    </Label>*/}
            {/*    <Input id="whatsapp-phone-id"*/}
            {/*           className="col-span-3" value={credentials.phone_number_id}*/}
            {/*           onChange={(e) => setCredentials({...credentials, phone_number_id: e.target.value})}/>*/}
            {/*</div>*/}
            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
            {/*    <Label htmlFor="whatsapp-client-id" className="text-right">*/}
            {/*        {t("configuration.whatsapp-client-id")}*/}
            {/*    </Label>*/}
            {/*    <Input id="whatsapp-client-id" className="col-span-3" value={credentials.whatsapp_client_id}*/}
            {/*           onChange={(e) => setCredentials({...credentials, whatsapp_client_id: e.target.value})}/>*/}
            {/*</div>*/}
            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
            {/*    <Label htmlFor="whatsapp-client-secret" className="text-right">*/}
            {/*        {t("configuration.whatsapp-client-secret")}*/}
            {/*    </Label>*/}
            {/*    <Input id="whatsapp-client-secret" type="password" className="col-span-3"*/}
            {/*           value={credentials.whatsapp_client_secret}*/}
            {/*           onChange={(e) => setCredentials({...credentials, whatsapp_client_secret: e.target.value})}/>*/}
            {/*</div>*/}
            {/*<Separator/>*/}
            <div className="flex flex-col gap-2">
                <h2>{t("configuration.maintainers-title")}</h2>
                <Maintainers/>
            </div>
        </div>
    )
}
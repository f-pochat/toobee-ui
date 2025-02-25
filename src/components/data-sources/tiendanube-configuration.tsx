import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "react-i18next";
import {useGetTiendanubeConfiguration} from "@/hooks/use-get-tiendanube-configuration.tsx";
import {ChangeEvent, useState} from "react";
import {useConfigureTiendanube} from "@/hooks/use-configure-tiendanube.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

export const TiendanubeConfiguration = () => {
    const { t } = useTranslation();
    const chatbotId = localStorage.getItem('active_chatbot_id') || undefined
    const queryClient = useQueryClient();
    const { data: tiendanubeConfig } = useGetTiendanubeConfiguration(chatbotId);
    const { mutateAsync: configureTiendanube, isPending: configureTiendanubeIsPending } = useConfigureTiendanube({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tiendanube-configuration', chatbotId] });
        },
        onError: () => {
            toast.error(t("tiendanube.error"));
        }
    });
    const [code, setCode] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleSubmit = async () => {
        await configureTiendanube({
            chatbotId: chatbotId,
            code: code
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
                <h2 className="p-2">
                    Tiendanube
                </h2>
                <Label className={tiendanubeConfig?.status === "CONNECTED" ? "text-green-500" : "text-red-500"}>
                    {tiendanubeConfig?.status === "CONNECTED" ? t("tiendanube.connected") : t("tiendanube.disconnected")}
                </Label>
            </div>
            <div className="flex justify-between gap-2">
                <Input
                    id="code"
                    placeholder={t("tiendanube.code")}
                    className="flex-1"
                    value={code}
                    onChange={handleChange}
                    disabled={tiendanubeConfig?.status === "CONNECTED" || configureTiendanubeIsPending}
                />
                <Button
                    disabled={tiendanubeConfig?.status === "CONNECTED" || configureTiendanubeIsPending}
                    onClick={handleSubmit}
                >
                    {t("tiendanube.save")}
                </Button>
            </div>
        </div>
    );
};

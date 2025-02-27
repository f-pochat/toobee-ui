import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "react-i18next";
import {useGetTiendanubeConfiguration} from "@/hooks/use-get-tiendanube-configuration.tsx";
import {ChangeEvent, useState} from "react";
import {useConfigureTiendanube} from "@/hooks/use-configure-tiendanube.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useDisconnectTiendanube} from "@/hooks/use-disconnect-tiendanube.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export const TiendanubeConfiguration = () => {
    const { t } = useTranslation();
    const chatbotId = localStorage.getItem('active_chatbot_id') || undefined;
    const queryClient = useQueryClient();
    const { data: tiendanubeConfig } = useGetTiendanubeConfiguration(chatbotId);
    const { mutateAsync: configureTiendanube, isPending: configureTiendanubeIsPending } = useConfigureTiendanube({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tiendanube-configuration', chatbotId] });
        },
        onError: () => {
            toast.error(t("tiendanube.connect-error"));
        }
    });
    const { mutateAsync: disconnectTiendanube, isPending: disconnectIsPending } = useDisconnectTiendanube({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tiendanube-configuration', chatbotId] });
        },
        onError: () => {
            toast.error(t("tiendanube.disconnect-error"));
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

    const handleDisconnect = async () => {
        await disconnectTiendanube({ chatbotId });
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-8">
                <h2 className="flex flex-row items-center gap-2 p-2">
                    <img src="/tiendanube.png" alt="tiendanube" className="w-auto h-6"/>
                    Tiendanube
                </h2>
                <Badge className={`${tiendanubeConfig?.status === "CONNECTED" ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"}`}>
                    {tiendanubeConfig?.status === "CONNECTED" ? t("tiendanube.connected") : t("tiendanube.disconnected")}
                </Badge>
            </div>

            {tiendanubeConfig?.status === "CONNECTED" ? (
                <Button
                    onClick={handleDisconnect}
                    disabled={disconnectIsPending}
                >
                    {t("tiendanube.disconnect")}
                </Button>
            ) : (
                <div className="flex justify-between gap-2">
                    <Input
                        id="code"
                        placeholder={t("tiendanube.code")}
                        className="flex-1"
                        value={code}
                        onChange={handleChange}
                        disabled={configureTiendanubeIsPending}
                    />
                    <Button
                        disabled={configureTiendanubeIsPending}
                        onClick={handleSubmit}
                    >
                        {t("tiendanube.save")}
                    </Button>
                </div>
            )}
        </div>
    );
};

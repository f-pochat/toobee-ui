import {Step, Stepper} from "@/components/ui/stepper.tsx";
import {Bot} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useRef, useState} from "react";
import {t} from "i18next";
import {Textarea} from "@/components/ui/textarea.tsx";
import {CreateChatbotParams, useCreateChatbot} from "@/hooks/use-create-chatbot.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactCanvasConfetti from "react-canvas-confetti";
import {useNavigate} from "@tanstack/react-router";

export const CreateChatbotStepper = () => {
    const [chatbotInfo, setChatbotInfo] = useState<CreateChatbotParams>({
        name: "",
        permanent_access_token: "",
        phone_number_id: "",
        system_message: "",
        whatsapp_client_id: "",
        whatsapp_client_secret: ""
    });

    const confettiRef = useRef<any>(null);
    const navigate = useNavigate()

    const fireConfetti = () => {
        confettiRef.current.confetti({
            particleCount: 400,
            angle: 45,
            spread: 75,
            origin: { x: 0, y: 1 },
            startVelocity: 50,
            gravity:0.5,
            drift: 0.5,
            zIndex: 9999
        })

        confettiRef.current.confetti({
            particleCount: 400,
            angle: 135,
            spread: 75,
            origin: { x: 1, y: 1 },
            startVelocity: 50,
            gravity:0.5,
            drift: -0.5,
            zIndex: 9999
        })
    };

    const { mutateAsync: createChatbot, isPending, isSuccess } = useCreateChatbot({
        onError: (error) => {
            toast.error(
                `Error creando Chatbot: ${error.message || ""}`
            );
        },
        onSuccess: () => {
            fireConfetti();
            setTimeout(() => {
                navigate({to:"/chats"});
            }, 3000)
        }
    });

    const steps: Step[] = [
        {
            id: 'name',
            name: t("create-chatbot.name-and-identity"),
            icon: <Bot />,
            component: ({ next }) => {
                const isValid =
                    chatbotInfo.name.trim().length > 0 &&
                    chatbotInfo.system_message.trim().length >= 20;

                return (
                    <div className="flex flex-col justify-start gap-10 w-full h-full">
                        <div className="w-full">
                            <h2 className="text-2xl font-bold">{t("create-chatbot.name-and-identity")}</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {t("create-chatbot.name-and-identity-description")}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="name">
                                {t("configuration.name")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={chatbotInfo.name}
                                onChange={(e) => setChatbotInfo({ ...chatbotInfo, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="system_message">
                                {t("prompting.system-message")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Textarea
                                id="system_message"
                                value={chatbotInfo.system_message}
                                onChange={(e) => setChatbotInfo({ ...chatbotInfo, system_message: e.target.value })}
                                className="col-span-6 resize-none"
                                placeholder={t("create-chatbot.system-message-placeholder")}
                            />
                            <p className="text-xs text-gray-500">{t("create-chatbot.min-characters")}</p>
                        </div>
                        <div className="flex justify-end">
                            <Button disabled={!isValid} onClick={next}>
                                {t("create-chatbot.next")}
                            </Button>
                        </div>
                    </div>
                );
            }
        },
        {
            id: 'credentials',
            name: t("configuration.credentials"),
            icon: <Bot />,
            component: ({ next, previous }) => {
                const isValid =
                    chatbotInfo.phone_number_id.trim().length > 0 &&
                    chatbotInfo.whatsapp_client_id.trim().length > 0 &&
                    chatbotInfo.whatsapp_client_secret.trim().length > 0 &&
                    chatbotInfo.permanent_access_token.trim().length > 0;

                return (
                    <div className="flex flex-col justify-start gap-10 w-full h-full">
                        <div className="w-full">
                            <h2 className="text-2xl font-bold">{t("configuration.credentials")}</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {t("create-chatbot.credentials-description")}
                            </p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="whatsapp-phone-id" className="text-right">
                                {t("configuration.phone-number-id")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                                id="whatsapp-phone-id"
                                className="col-span-3"
                                value={chatbotInfo.phone_number_id}
                                onChange={(e) => setChatbotInfo({ ...chatbotInfo, phone_number_id: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="whatsapp-client-id" className="text-right">
                                {t("configuration.whatsapp-client-id")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                                id="whatsapp-client-id"
                                className="col-span-3"
                                value={chatbotInfo.whatsapp_client_id}
                                onChange={(e) => setChatbotInfo({ ...chatbotInfo, whatsapp_client_id: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="whatsapp-client-secret" className="text-right">
                                {t("configuration.whatsapp-client-secret")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                                id="whatsapp-client-secret"
                                type="password"
                                className="col-span-3"
                                value={chatbotInfo.whatsapp_client_secret}
                                onChange={(e) => setChatbotInfo({ ...chatbotInfo, whatsapp_client_secret: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="permanent-access-token" className="text-right">
                                {t("configuration.permanent-access-token")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                                id="permanent-access-token"
                                type="password"
                                className="col-span-3"
                                value={chatbotInfo.permanent_access_token}
                                onChange={(e) => setChatbotInfo({ ...chatbotInfo, permanent_access_token: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={previous}>{t("create-chatbot.previous")}</Button>
                            <Button disabled={!isValid} onClick={next}>
                                {t("create-chatbot.create-chatbot")}
                            </Button>
                        </div>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="relative flex flex-col items-center p-16 justify-center h-screen bg-white overflow-hidden">
            <ReactCanvasConfetti
                onInit={(instance) => {
                    confettiRef.current = instance;
                }}
                style={{
                    position: "fixed",
                    pointerEvents: "none",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex:999
                }}
            />
            <div className="flex items-center justify-start w-3/5 h-3/5">
                <Stepper
                    steps={steps}
                    defaultStepId="name"
                    onLastStep={async () => {
                        await createChatbot(chatbotInfo);
                    }}
                />
            </div>

            {isPending && (
                <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center bg-white bg-opacity-75">
                    <Spinner />
                    <p>{t("create-chatbot.creating-chatbot")}</p>
                </div>
            )}

            {isSuccess && (
                <div className="absolute z-10 inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75">
                    <span className="text-6xl font-mono text-center">{t("create-chatbot.chatbot-started")}</span>
                </div>
            )}

            <ToastContainer/>
        </div>
    );
};
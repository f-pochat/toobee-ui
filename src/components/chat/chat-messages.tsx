import {useGetChat} from "@/hooks/use-get-chat.tsx";
import {useEffect, useRef, useState} from "react";
import {ChatSkeleton} from "@/components/chat/chat-skeleton.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Avatar} from "@/components/ui/avatar.tsx";
import {Bot, RefreshCw, User, UserCog} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useSetIsAiAnswered} from "@/hooks/use-set-ai-answer.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {Label} from "@/components/ui/label.tsx";
import {useSendMessage} from "@/hooks/use-send-message.tsx";
import {ChatWithMessages} from "@/types.ts";

export const ChatMessages = ({ chatId }: { chatId: string }) => {
    const { data: chat, isLoading } = useGetChat(chatId);
    const {mutateAsync: sendMessage, isPending} = useSendMessage()
    const queryClient = useQueryClient();
    const chatEndRef = useRef(null);
    const [value, setValue] = useState<string>("")

    const setIsAiAnswered = useSetIsAiAnswered();

    useEffect(() => {
        // @ts-ignore
        chatEndRef.current?.scrollIntoView();
    }, [chat]);


    const handleToggle = () => {
        if (!chat) return;
        // Optimistically update UI
        queryClient.setQueryData(["chat-messages", chatId], (oldData: ChatWithMessages) => ({
            ...oldData,
            ai_response: !chat.ai_response, // Update state optimistically
        }));

        setIsAiAnswered.mutate(
            { chatId, isAiAnswered: !chat.ai_response },
            {
                onError: () => {
                    // Rollback to previous state on failure
                    queryClient.setQueryData(["chat-messages", chatId], (oldData: ChatWithMessages) => ({
                        ...oldData,
                        ai_response: chat.ai_response, // Revert to previous state
                    }));
                },
            }
        );
    };

    console.log(value)

    const sendChatMessage = async() => {
        if (!chat) return;
        const message = value;
        setValue("");
        // Optimistically update UI
        queryClient.setQueryData(["chat-messages", chatId], (oldData: ChatWithMessages) => ({
            ...oldData,
            messages: [...oldData.messages, {
                id: "id",
                content: message,
                role: "manual",
                created_at: new Date()
            }]
        }));

        await sendMessage(
            { chat_id: chatId, message: value ?? "" },
            {
                onError: () => {
                    // Rollback to previous state on failure
                    queryClient.setQueryData(["chat-messages", chatId], (oldData: ChatWithMessages) => ({
                        ...oldData,
                        messages: oldData.messages.splice(-1)
                    }));
                },
            }
        );
    }

    return (
        <div className="flex flex-col h-full w-full">
            {isLoading ? (
                <ChatSkeleton />
            ) : (
                <>
                    <div className="flex items-center justify-between px-4 py-4 border-b">
                        <Button variant="outline" onClick={() => queryClient.invalidateQueries({queryKey: ["chat-messages", chatId]})}>
                            <RefreshCw />
                        </Button>
                        <h1 className="text-lg font-semibold">{chat?.name}</h1>
                        <div className="flex items-center px-2 gap-2">
                            <Label htmlFor="ai">AI Responses</Label>
                            <Switch
                                id="ai"
                                checked={chat?.ai_response}
                                onCheckedChange={handleToggle} // Handle toggle
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary">
                        {chat?.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-end space-x-2 ${
                                    message.role === "assistant" || message.role === "manual" ? "justify-end" : ""
                                }`}
                            >
                                {message.role === "customer" && (
                                    <Avatar className="flex items-center">
                                        <User />
                                    </Avatar>
                                )}
                                <div
                                    className={`p-2 rounded-lg max-w-xl ${
                                        message.role === "customer" ? "bg-white dark:bg-gray-800" : "bg-blue-500 text-white"
                                    }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                {message.role === "assistant" && (
                                    <Avatar className="flex items-center">
                                        <Bot />
                                    </Avatar>
                                )}
                                {message.role === "manual" && (
                                    <Avatar className="flex items-center">
                                        <UserCog />
                                    </Avatar>
                                )}
                            </div>
                        ))}

                        <div ref={chatEndRef} />
                    </div>
                    <div className="flex items-center space-x-2 p-8 bg-secondary">
                        <Input className="flex-1 bg-white" placeholder="Type a message" value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
                        <Button disabled={isPending || !value} onClick={sendChatMessage}>Send</Button>
                    </div>
                </>
            )}
        </div>
    );
};

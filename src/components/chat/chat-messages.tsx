import {useGetChat} from "@/hooks/use-get-chat.tsx";
import {useEffect, useRef} from "react";
import {ChatSkeleton} from "@/components/chat/chat-skeleton.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Avatar} from "@/components/ui/avatar.tsx";
import {Bot, User, UserCog} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useSetIsAiAnswered} from "@/hooks/use-set-ai-answer.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {Label} from "@/components/ui/label.tsx";

export const ChatMessages = ({ chatId }: { chatId: string }) => {
    const { data: chat, isLoading } = useGetChat(chatId);
    const queryClient = useQueryClient();
    const chatEndRef = useRef(null);

    const setIsAiAnswered = useSetIsAiAnswered();

    useEffect(() => {
        // @ts-ignore
        chatEndRef.current?.scrollIntoView();
    }, [chat]);


    const handleToggle = () => {
        if (!chat) return;
        // Optimistically update UI
        queryClient.setQueryData(["chat-messages", chatId], (oldData: any) => ({
            ...oldData,
            ai_response: !chat.ai_response, // Update state optimistically
        }));

        setIsAiAnswered.mutate(
            { chatId, isAiAnswered: !chat.ai_response },
            {
                onError: () => {
                    // Rollback to previous state on failure
                    queryClient.setQueryData(["chat-messages", chatId], (oldData: any) => ({
                        ...oldData,
                        ai_response: chat.ai_response, // Revert to previous state
                    }));
                },
            }
        );
    };


    return (
        <div className="flex flex-col h-full w-full">
            {isLoading ? (
                <ChatSkeleton />
            ) : (
                <>
                    <div className="flex items-center justify-between px-4 py-4 border-b">
                        <h1 className="text-lg font-semibold">Chat Room</h1>
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
                        <Input className="flex-1 bg-white" placeholder="Type a message" />
                        <Button disabled={true}>Send</Button>
                    </div>
                </>
            )}
        </div>
    );
};

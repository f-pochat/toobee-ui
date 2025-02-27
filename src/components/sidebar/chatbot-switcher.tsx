import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Bot, ChevronsUpDown} from "lucide-react";
import {useEffect, useState} from "react";
import {useGetChatbots} from "@/hooks/use-get-chatbots.tsx";
import {Chatbot} from "@/types.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useNavigate} from "@tanstack/react-router";

export const ChatbotSwitcher = () => {
    const [activeChatbot, setActiveChatbot] = useState<Chatbot | null>(null);
    const active_chatbot_id = localStorage.getItem("active_chatbot_id");
    const {data: chatbots, isLoading} = useGetChatbots();
    const navigate = useNavigate();

    useEffect(() => {
        if (chatbots && chatbots.length > 0) {
            setActiveChatbot(chatbots.find(c => c.id === active_chatbot_id) ?? chatbots[0])
            if (!active_chatbot_id) localStorage.setItem("active_chatbot_id", chatbots[0]?.id);
        } else if(!isLoading){
        navigate({ to: "/init-chatbot" });
        }
    }, [active_chatbot_id, chatbots]);

    const {isMobile} = useSidebar();

    if (isLoading || !chatbots) {
        return <SidebarMenu>
            <SidebarMenuItem>
                <Skeleton/>
            </SidebarMenuItem>
        </SidebarMenu>
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div
                                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Bot className="size-4"/>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {activeChatbot?.name}
                        </span>
                            </div>
                            <ChevronsUpDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Chatbots
                        </DropdownMenuLabel>
                        {chatbots.map((chatbot) => (
                            <DropdownMenuItem
                                key={chatbot.name}
                                onClick={() => {
                                    setActiveChatbot(chatbot)
                                    localStorage.setItem("active_chatbot_id", chatbot.id)
                                }}
                                className="gap-2 p-2"
                            >
                                {chatbot.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
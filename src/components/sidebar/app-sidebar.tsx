import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader, SidebarInput,
    SidebarRail,
} from "@/components/ui/sidebar.tsx"
import {ChatbotSwitcher} from "@/components/sidebar/chatbot-switcher.tsx";
import {Settings} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import {ConfigureChatbot} from "@/components/sidebar/configure-chatbot.tsx";
import {useGetChats} from "@/hooks/use-get-chats.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {LogoutFooter} from "@/components/sidebar/logout-footer.tsx";

export const AppSidebar = () => {
    const chatbot_id = localStorage.getItem("chatbot_id");
    const {data: chats, isLoading} = useGetChats(chatbot_id ?? undefined);
    return (
        <Dialog>
            <Sidebar collapsible="none" className="h-screen">
                <SidebarHeader>
                    <div className="flex justify-between items-center gap-1">
                        <ChatbotSwitcher/>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="p-1">
                                <Settings style={{height: '100%', width: '100%'}}/>
                            </Button>
                        </DialogTrigger>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="flex gap-2">
                        <SidebarInput placeholder="Type to search..."/>
                        {
                            isLoading || !chats ?
                                <Skeleton/>
                                :
                                <SidebarGroupContent>
                                    {chats.map((chat) => (
                                        <a
                                            href="#"
                                            key={chat.name}
                                            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                        >
                                            <div className="flex w-full items-center gap-2">
                                                <h3 className="font-bold">{chat.name}</h3>
                                                <span className="ml-auto text-xs">{chat.last_message_date}</span>
                                            </div>
                                            <div className="flex w-full items-center gap-2">
                                                <span>{chat.phone_number}</span>{" "}
                                            </div>
                                            <span className="line-clamp-2 w-full whitespace-break-spaces text-xs">
                                        {chat.last_message}
                                      </span>
                                        </a>
                                    ))}
                                </SidebarGroupContent>
                        }
                    </SidebarGroup>
                </SidebarContent>
                <LogoutFooter />
                <SidebarRail/>
            </Sidebar>
            <ConfigureChatbot/>
        </Dialog>
    )
}


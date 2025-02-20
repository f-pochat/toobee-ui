import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import {Folders, Inbox, Settings, Terminal} from "lucide-react";
import {ChatbotSwitcher} from "@/components/sidebar/chatbot-switcher.tsx";
import {LogoutFooter} from "@/components/sidebar/logout-footer.tsx";

const items = [
    {
        title: "Chats",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Data Sources",
        url: "#",
        icon: Folders,
    },
    {
      title: "Prompting",
      url: "#",
      icon: Terminal,
    },
    {
        title: "Configuration",
        url: "#",
        icon: Settings,
    }
]

export const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex justify-between items-center gap-1">
                    <ChatbotSwitcher/>
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <LogoutFooter />
            </SidebarFooter>
            <SidebarRail className="focus:outline-0 hover:outline-0 hover:border-0 border-0" />
        </Sidebar>
    )
}
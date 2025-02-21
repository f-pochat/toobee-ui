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
import {Link, useLocation} from "@tanstack/react-router";

const items = [
    {
        title: "Chats",
        url: "/chats",
        icon: Inbox,
    },
    {
        title: "Data Sources",
        url: "/data-sources",
        icon: Folders,
    },
    {
        title: "Prompting",
        url: "/prompting",
        icon: Terminal,
    },
    {
        title: "Configuration",
        url: "/configuration",
        icon: Settings,
    }
]

export const AppSidebar = () => {
    const {pathname} = useLocation();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex justify-between items-center gap-1">
                    <ChatbotSwitcher/>
                    <SidebarTrigger/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link to={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <LogoutFooter/>
            </SidebarFooter>
            <SidebarRail className="focus:outline-0 hover:outline-0 hover:border-0 border-0"/>
        </Sidebar>
    )
}
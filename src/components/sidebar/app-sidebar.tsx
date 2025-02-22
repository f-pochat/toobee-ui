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
import {useTranslation} from "react-i18next";

export const AppSidebar = () => {
    const {t} = useTranslation();

    const items = [
        {
            title: t("sections.chats"),
            url: "/chats",
            icon: Inbox,
        },
        {
            title: t("sections.data-sources"),
            url: "/data-sources",
            icon: Folders,
        },
        {
            title: t("sections.prompting"),
            url: "/prompting",
            icon: Terminal,
        },
        {
            title: t("sections.configuration"),
            url: "/configuration",
            icon: Settings,
        }
    ]

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
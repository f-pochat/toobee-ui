import {Avatar} from "@radix-ui/react-avatar";
import {Button} from "@/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import {useLogout} from "@/hooks/use-logout.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useUserInfo} from "@/hooks/use-user-info.tsx";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";


export const LogoutFooter = () => {
    const navigate = useNavigate()

    const {data: userInfo} = useUserInfo();

    const {logout} = useLogout();

    const handleLogout = async () => {
        logout()
        await navigate({
            to: '/login'
        })
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem className="pt-4 pb-2 border-t flex items-center justify-between">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Avatar
                            className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            {userInfo?.name[0]}
                        </Avatar>
                        <span className="text-sm font-medium">{userInfo?.name}</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 p-2"
                    >
                        <LogOut/>
                    </Button>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
import {Avatar} from "@radix-ui/react-avatar";
import {Button} from "@/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import {useLogout} from "@/hooks/use-logout.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useUserInfo} from "@/hooks/use-user-info.tsx";


export const LogoutFooter = () => {
    const navigate = useNavigate()

    const {data: userInfo} = useUserInfo();

    const {mutateAsync: logout} = useLogout({
        onSuccess: async () => {
            await navigate({
                to: '/login'
            })
        }
    });

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="p-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 flex items-center justify-center bg-gray-700 text-white">
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
        </div>
    )
}
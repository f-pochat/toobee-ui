
import { Button } from "@/components/ui/button"
import { Avatar} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {Bot, User} from "lucide-react";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";

export const Chat = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between px-4 py-4 border-b">
                <h1 className="text-lg font-semibold">Chat Room</h1>
                <div className="flex items-center px-2 gap-2">
                    <Label htmlFor="ai">AI Responses</Label>
                    <Switch id="ai"/>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary">
                <div className="flex items-end space-x-2">
                    <Avatar className="flex items-center">
                        <User />
                    </Avatar>
                    <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                        <p className="text-sm">Hello everyone!</p>
                    </div>
                </div>
                <div className="flex items-end space-x-2">
                    <Avatar className="flex items-center">
                        <User />
                    </Avatar>
                    <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                        <p className="text-sm">How's it going?</p>
                    </div>
                </div>
                <div className="flex items-end justify-end space-x-2">
                    <div className="p-2 rounded-lg bg-blue-500 text-white">
                        <p className="text-sm">Hello! It's going well, thanks for asking.</p>
                    </div>
                    <Avatar className="flex items-center">
                        <Bot />
                    </Avatar>
                </div>
                <div className="flex items-end justify-end space-x-2">
                    <div className="p-2 rounded-lg bg-blue-500 text-white">
                        <p className="text-sm">What about you?</p>
                    </div>
                    <Avatar className="flex items-center">
                        <User />
                    </Avatar>
                </div>
            </div>
            <div className="flex items-center space-x-2 p-8 bg-secondary">
                <Input className="flex-1 bg-white" placeholder="Type a message" />
                <Button>
                    Send
                </Button>
            </div>
        </div>
    )
}
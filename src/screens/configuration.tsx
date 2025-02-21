import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

export const ConfigurationScreen = () => {
    return (
        <div className="flex flex-col p-10 gap-3">
            <div className="flex flex-row justify-between items-center">
                <h1>Configuration</h1>
                <Button>Save Changes</Button>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                   Chatbot Name
                </Label>
                <Input id="name" value="DeSillas" className="col-span-3"/>
            </div>
            <Separator />
            <h2>Credentials</h2>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="whatsapp-phone-id" className="text-right">
                    Phone Number ID
                </Label>
                <Input id="whatsapp-phone-id" type="password" className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="whatsapp-client-id" className="text-right">
                    Whatsapp Client ID
                </Label>
                <Input id="whatsapp-client-id" type="password" className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="whatsapp-client-secret" className="text-right">
                    Whatsapp Client Secret
                </Label>
                <Input id="whatsapp-client-secret" type="password" className="col-span-3"/>
            </div>
        </div>
    )
}
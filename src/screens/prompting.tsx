import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export const PromptingScreen = () => {
    return (
        <div className="flex flex-col p-10 gap-3">
            <div className="flex flex-row justify-between items-center">
                <h1>Prompting</h1>
                <Button>Save Changes</Button>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    System Message
                </Label>
                <Textarea id="name" value="Hola, tu nombre es José. El asistente virtual de DeSillas" className="col-span-3 resize-none"/>
            </div>
        </div>
    )
}
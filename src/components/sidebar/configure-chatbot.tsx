import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import Dropzone from "shadcn-dropzone";
import {Badge} from "@/components/ui/badge.tsx";
import {CircleX} from "lucide-react";

export const ConfigureChatbot = () => {
    return (
        <DialogContent className="sm:max-w-[50%]">
            <DialogHeader>
                <DialogTitle>Configure chatbot</DialogTitle>
                <DialogDescription>
                    Make changes to your chatbot here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input id="name" value="DeSillas" className="col-span-3"/>
                </div>
            </div>
            <Accordion type="single" collapsible className="flex flex-col gap-2">
                <AccordionItem value="credentials">
                    <AccordionTrigger className="px-2">Credentials</AccordionTrigger>
                    <AccordionContent className="p-2 flex flex-col gap-2">
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
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="data-sources">
                    <AccordionTrigger className="px-2">Data Sources</AccordionTrigger>
                    <AccordionContent className="p-2 flex flex-col gap-2">
                        <Dropzone
                            dropZoneClassName="h-[100px]"
                            onDrop={() => {
                                // Do something with the files
                                console.log("BOCA")
                            }}
                        />
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary" className="flex justify-between gap-1 py-2">
                                inventario.pdf
                                <CircleX size={16} className="cursor-pointer"/>
                            </Badge>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    )
}
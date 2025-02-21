import Dropzone from "shadcn-dropzone";
import {Badge} from "@/components/ui/badge.tsx";
import {CircleX} from "lucide-react";

export const DataSourceScreen = () => {
    return (
        <div className="p-10">
            <h2>
                PDF Sources
            </h2>
            <div className="p-2 flex flex-col gap-2">
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
            </div>
        </div>
    )
}
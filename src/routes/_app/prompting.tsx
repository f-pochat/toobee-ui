import {createFileRoute} from '@tanstack/react-router'
import {PromptingScreen} from "@/screens/prompting.tsx";

export const Route = createFileRoute('/_app/prompting')({
    component: prompting,
})

function prompting() {
    return (
        <PromptingScreen/>
    )
}
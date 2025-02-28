import { createFileRoute } from '@tanstack/react-router'
import {CreateChatbot} from "@/screens/create-chatbot.tsx";
import ProtectedLayout from "@/lib/protected-layout.tsx";

export const Route = createFileRoute('/init-chatbot')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedLayout>
            <CreateChatbot/>
        </ProtectedLayout>
    )
}
import {createFileRoute} from '@tanstack/react-router'
import {ChatsScreen} from "@/screens/chats.tsx";

export const Route = createFileRoute('/_app/chats')({
    component: chats,
})

function chats() {
    return (
        <ChatsScreen/>
    )
}
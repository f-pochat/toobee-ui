import {createFileRoute, Navigate} from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
    component: index,
})

function index() {
    return (
       <Navigate to="/chats"/>
    )
}
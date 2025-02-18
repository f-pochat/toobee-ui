import { createFileRoute } from '@tanstack/react-router'
import {LoginScreen} from "@/screens/login.tsx";

export const Route = createFileRoute('/login')({
    component: Login,
})

function Login() {
    return <LoginScreen />
}
import {createFileRoute} from '@tanstack/react-router'
import {ConfigurationScreen} from "@/screens/configuration.tsx";

export const Route = createFileRoute('/_app/configuration')({
    component: configuration,
})

function configuration() {
    return (
        <ConfigurationScreen/>
    )
}
import {createFileRoute, Outlet} from '@tanstack/react-router'
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";

export const Route = createFileRoute('/_app')({
    component: App,
})

function App() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Outlet/>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
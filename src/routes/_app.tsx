import {createFileRoute, Outlet} from '@tanstack/react-router'
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import ProtectedLayout from "@/lib/protected-layout.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";

export const Route = createFileRoute('/_app')({
    component: App,
})

function App() {
    return (
        <>
            <ProtectedLayout>
                <SidebarProvider>
                    <AppSidebar/>
                    <SidebarInset>
                        <Outlet/>
                    </SidebarInset>
                </SidebarProvider>
            </ProtectedLayout>
        </>
    )
}
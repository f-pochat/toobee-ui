import {createFileRoute, Outlet} from '@tanstack/react-router'
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import ProtectedLayout from "@/lib/protected-layout.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ChatbotGuard} from "@/guards/chatbot-guard";


export const Route = createFileRoute('/_app')({
    component: App,
})

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: "es",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },
    });

function App() {
    return (
        <>
            <ProtectedLayout>
                <ChatbotGuard>
                    <SidebarProvider>
                        <AppSidebar/>
                            <SidebarInset>
                                <Outlet/>
                            </SidebarInset>
                    </SidebarProvider>
                </ChatbotGuard>
            </ProtectedLayout>
            <ToastContainer />
        </>
    )
}
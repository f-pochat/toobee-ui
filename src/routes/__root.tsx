import { createRootRoute, Outlet } from '@tanstack/react-router'
import {ToastContainer} from "react-toastify";

export const Route = createRootRoute({
    component: () => (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    ),
})
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { LoginForm } from "../component/LoginFrom";
import { AuthPage } from "../pages/AuthPages";

export const authRoute = createRoute({
    getParentRoute:()=>rootRoute,
    path:'/auth',
    component:AuthPage
})
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { Abcd } from "../component/Urllow";

export const homePageRoute = createRoute({
    getParentRoute:()=>rootRoute,
    path:'/',
    component:Abcd
})
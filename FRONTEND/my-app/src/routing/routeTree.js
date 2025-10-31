import { Component } from "react"
import App from "../App"
import {createRootRoute} from "@tanstack/react-router" 
import { homePageRoute } from "./homePage";
import { dashboardRoute } from "./dashboard";
import { authRoute } from "./aut.rout";
import { comingsoonRoute } from "./comingsoon";
export const rootRoute = createRootRoute({
    component:App 
})
export const routeTree = rootRoute.addChildren([
    homePageRoute,
    dashboardRoute,
    authRoute,
    comingsoonRoute,
]);
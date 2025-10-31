import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { checkAuth } from "../utils/helper";
import ComingSoon from "../component/Comingsoon";

export const comingsoonRoute = createRoute({
    getParentRoute:()=>rootRoute,
    path:'/profile',
    component:ComingSoon,
    beforeLoad:checkAuth
})
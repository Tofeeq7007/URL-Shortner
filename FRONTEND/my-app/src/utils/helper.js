import { getCurrentUser } from "../api/user.api.js";
import { login } from "../store/slice/authslice.js";
import { redirect } from "@tanstack/react-router"
export const checkAuth =  async ({context})=>{
    try{
        // console.log(context);
        
        const {queryClient,store} = context;
        const user = await queryClient.ensureQueryData({
            queryKey:['currentUser'],
            queryFn:getCurrentUser,
            retry:false,
        });
        if(!user) return false;
        store.dispatch(login(user));
        const auth = store.getState().auth;
        if(!auth.isAuthenticated){
            return false;
            // throw redirect({to:'/login'});
        }
        return true;

    }catch(error){
        return redirect({to:'/auth'})
    }
    

}
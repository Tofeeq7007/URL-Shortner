import { useState } from "react"
import { LoginForm } from "../component/LoginFrom";
import { RegisterForm } from "../component/RegisterForm";

export const AuthPage = ()=>{
    const[login,setlogin] = useState(true);

    return (
        <div>
           { login ? <LoginForm state={setlogin}/> : <RegisterForm state={setlogin}/>}
        </div>
    )
}
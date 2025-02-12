import { FunctionComponent } from "react"
import { Navigate } from "react-router";

export const Login: FunctionComponent =()=>{
    const userLoggedIn=true;    

    return <>{userLoggedIn && <Navigate to='/book-list'/>}<h2>Login</h2></>
}
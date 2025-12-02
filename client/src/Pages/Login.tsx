import { useState } from "react"
import { Button } from "../Components/Button"
import { Input } from "../Components/Input"

import "../Styles/Pages/Login.css"
import { FormCard } from "../Components/FromCard"
import { FormLink } from "../Components/FormLink"


export const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return <>
        <FormCard>
            <h1 className="auth__text">Wellcome</h1>
            <Input onChange={setUsername} 
                placeholder="email"
                type="email"></Input>
            <Input onChange={setPassword} 
                placeholder="password"
                type="password"></Input>
            <Button>Login</Button>
            <FormLink endpoint="/register">Don't have an account?</FormLink>
        </FormCard>
    </>
}
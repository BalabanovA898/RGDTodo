import { useState } from "react";
import { FormCard } from "../Components/FromCard";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { FormLink } from "../Components/FormLink";


export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    return <>
        <FormCard>
            <h1 className="auth__text">Registration</h1>
            <Input onChange={setUsername} 
                placeholder="email"
                type="email"></Input>
            <Input onChange={setPassword} 
                placeholder="password"
                type="password"></Input>
            <Input onChange={setRepeatPassword} 
                placeholder="repeat your password"
                type="password"></Input>
            <Button>Sign up</Button>
            <FormLink 
            endpoint="/"
            >Already have the account?</FormLink>
        </FormCard>
    </>
}
import { useContext, useState } from "react"
import { Button } from "../Components/Button"
import { Input } from "../Components/Input"

import "../Styles/Pages/Login.css"
import { FormCard } from "../Components/FromCard"
import { FormLink } from "../Components/FormLink"
import { Context } from ".."
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../Components/Spinner"
import Notification from "../Classes/Notification"


export const Login = observer(() => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {store} = useContext(Context);

    const navigate = useNavigate();

    return <>
        {store.isLoading && <Spinner></Spinner>}
        <FormCard>
            <h1 className="auth__text">Wellcome</h1>
            <Input onChange={setEmail} 
                placeholder="email"
                type="email"></Input>
            <Input onChange={setPassword} 
                placeholder="password"
                type="password"></Input>
            <Button onClick={
                async () => {
                    try {
                        store.setLoading(true);
                        await store.login(email, password);
                        if (store.isAuth)
                            navigate("/home");
                    } catch (e: any) {
                        store.notifications.push(new Notification("error", e.message));
                    } finally {
                        store.setLoading(false);
                    }
                }
            }>Login</Button>
            <FormLink endpoint="/register">Don't have an account?</FormLink>
        </FormCard>
    </>
});
import { useContext, useState } from "react";
import { FormCard } from "../Components/FromCard";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { FormLink } from "../Components/FormLink";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import Notification from "../Classes/Notification";
import { Spinner } from "../Components/Spinner";


export const Register = observer(() => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const {store} = useContext(Context);

    const navigate = useNavigate();

    function validatePssword (password: string) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        return password.match(re);
    }

    return <>
        {store.isLoading && <Spinner></Spinner>}
        <FormCard>
            <h1 className="auth__text">Registration</h1>
            <Input onChange={setEmail} 
                placeholder="email"
                type="email"></Input>
            <Input onChange={setPassword} 
                placeholder="password"
                type="password"></Input>
            <Input onChange={setRepeatPassword} 
                placeholder="repeat your password"
                type="password"></Input>
            <Button onClick={async () => 
                {
                    if (!validatePssword(password)) {
                        store.notifications.push(new Notification("error", "Password must contain at least 8 chars, 1 uppercase letter, 1 lowercase letter and 1 digit"));
                        return;
                    }
                    if (password !== repeatPassword) {
                        store.notifications.push(new Notification("error", "Passwords don't match."));
                        return;
                    }
                    try {
                        store.setLoading(true);
                        await store.register(email, password);
                    } catch (e: any) {
                        store.notifications.push(new Notification("error", e.message));
                    } finally {
                        store.setLoading(false);
                    }
                    if (store.isAuth) navigate("/home");
                }
            }>Sign up</Button>
            <FormLink 
            endpoint="/"
            >Already have the account?</FormLink>
        </FormCard>
    </>
});
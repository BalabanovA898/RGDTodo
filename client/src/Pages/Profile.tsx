import { useContext, useEffect, useState } from "react"
import "../Styles/Pages/Profile.css"

import placeholder from "../images/sad_cat_transparent_bg.png"
import { useNavigate } from "react-router-dom"
import { Context } from ".."
import { Button } from "../Components/Button"
import ProfileService from "../services/ProfileService"
import { observer } from "mobx-react-lite"
import { Input } from "../Components/Input"
import { Modal } from "../Components/Modal"
import { Stack } from "../Enums/Stack"
import Notification from "../Classes/Notification"
import { Spinner } from "../Components/Spinner"

export const Profile = observer(() => {
    const {store} = useContext(Context);
    
    const navigate = useNavigate();
    
    const [isNameEditing, setNameEditing] = useState<boolean>(false);
    
    const [newproflePicture, setNewproflePicture] = useState<string | undefined>((store.user as any).profilePicture);
    const [newUsername, setNewUsername] = useState<string>(store.user.username);
    const [newStacks, setNewStacks] = useState<string[] | undefined>(store.user.stack)
    
    const [isStackEditModalActive, setStackEditModalActive] = useState<boolean>(false);
    
    const allStacks: Stack[] = ["Frontend", "Backend", "Fullstack", "Mobile", "Designer"];

    useEffect(() => {
        store.setLoading(true);
        if (localStorage.getItem("session")) 
            store.checkAuth().then((res:boolean) => {
                if (!res) {
                    store.notifications.push(new Notification("error", "You must log in to get acces to this page"))
                    store.setLoading(false);
                    navigate("/")
                }
            }).then(
                () => {
                    var ppf = (store.user as any).profilePicture;
                    setNewproflePicture(ppf);
                    var stacks = (store.user as any).stacks;
                    setNewStacks(stacks);
                    store.setLoading(false);
                }
            );
        else {
            store.notifications.push(new Notification("error", "You must log in to get acces to this page"));
            store.setLoading(false);
            navigate("/")
        }
    }, []);

    return !store.isLoading ? <div className="profile__container" style={{backgroundColor: "#000000ff"}}>
        <Modal
        active={isStackEditModalActive}
        setActive={setStackEditModalActive}>
            <div className="chosen-stack">
            {
                newStacks?.map(item => <div className="stack-item" style={{backgroundColor: "rgba(0, 255, 255, 0.1)"}}
                onClick={() => setNewStacks(newStacks.filter(i => i !== item))}>{item}</div>)
            }
            </div>
            <div className="other-stack">
                {
                    allStacks.filter(item => !newStacks?.includes(item)).map(item => <div className="stack-item"
                    onClick={() => setNewStacks(newStacks ? [...newStacks, item] : [item])}>{item}</div>)
                }
            </div>
            <Button onClick={() => setStackEditModalActive(false)}>Close</Button>
        </Modal>
        <input className="profile__input" id="image_input" type="file" accept="image/png" onChange={(e) => {
            var reader = new FileReader();
            reader.onloadend = () => {
                setNewproflePicture(reader.result?.toString() || "");
            }
            if (e.target.files)
                reader.readAsDataURL(e.target.files[0]);
        }}></input>
        <img className="profile__proflePicture" src={newproflePicture || placeholder} onClick={ () =>{
            document.getElementById("image_input")?.click();
        }}></img>
        {
            isNameEditing ?
            <Input
            value={newUsername}
            onChange={setNewUsername}></Input>
            :
            <h1 className="profile__username" onClick={() => setNameEditing(true)}>{store.user.username}</h1>
        }
        {newStacks?.length ?
        <div className="profile__stacks">
            {
                newStacks.map(item => <div className="stack-item" onClick={(() => setStackEditModalActive(true))}><p>{item}</p></div>)
            }
        </div>
        : <div className="stack-item" onClick={() => setStackEditModalActive(true)}>+stack</div>
        }
        <div className="profile__controls__container">
            <Button onClick={() => {
                setNewproflePicture(store.user.proflePicture);
                setNewUsername(store.user.username);
                navigate("/home");
            }}>Back</Button>
            <Button onClick={async () => {
                store.setLoading(true);
                const res = await ProfileService.updateProfile(store.user.id, store.user.email, newStacks, newproflePicture, newUsername);
                if (res) 
                    store.notifications.push(new Notification("error", res));
                else 
                    store.notifications.push(new Notification("notification", "Profile was updated"));
                store.setLoading(false);
                navigate("/home");
            }}>Save</Button>
        </div>
    </div> : <Spinner></Spinner>
})
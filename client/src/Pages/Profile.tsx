
import { useState } from "react"
import User from "../Classes/User"
import "../Styles/Pages/Profile.css"

import placeholder from "../images/sad_cat_transparent_bg.png"

export const Profile = () => {
    const [user, setUser] = useState<User>(new User(
        "1",
        "Andrey Balabanov",
        ["Frontend", "Backend", "Fullstack"]
    ));

    return <div className="profile__container">
        <input className="profile__input" id="image_input" type="file" accept="image/png"></input>
        <img className="profile__ppf" src={placeholder} onClick={ () =>{
            document.getElementById("image_input")?.click();
        }}></img>
        <h1 className="profile__username">{user.username}</h1>
        <div className="profile__stacks">
            {
                user.stack.map(item => <div className="stack-item"><p>{item}</p></div>)
            }
        </div>
    </div>
}
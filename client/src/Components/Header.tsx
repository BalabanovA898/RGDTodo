import "../Styles/Components/Header.css"
import { Button } from "./Button"
import proflePicture_placeholder from "../images/sad_cat_transparent_bg.png"
import { NavLink, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from ".."

export const Header = observer(() => {

    const {store} = useContext(Context);

    const navigate = useNavigate();

    return (<div className="header__container" style={{marginBottom: "20px",}}>
        <NavLink to="/home"><h1 className="header__logo">Todo:write some name!</h1></NavLink>
        <div className="header__profile__container">
            <NavLink to="/profile" className="header__profile-picture__container">
                <img src={(store.user as any).profilePicture || proflePicture_placeholder} alt="proflePicture" className="header__profile-picture"/>
                <h2 className="header__username">{store.user.username}</h2> 
            </NavLink>
            <Button className="header__btn" onClick={async () => {
                await store.logout();
                navigate("/");
            }}>Sign out</Button>
        </div>
    </div>)
})
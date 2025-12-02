import "../Styles/Components/Header.css"
import { Button } from "./Button"
import ppf_placeholder from "../images/sad_cat_transparent_bg.png"

export const Header = () => {
    return (<div className="header__container" style={{marginBottom: "20px",}}>
        <div className="header__profile__container">
            <img src={ppf_placeholder} alt="ppf" className="header__profile-picture"/>
           <h2 className="header__username">Placeholder</h2> 
        </div>
        <Button className="header__btn">Sign out</Button>
    </div>)
}
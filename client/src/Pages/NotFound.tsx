import "../Styles/Pages/NotFound.css";
import cat from "../images/sad_cat_transparent_bg.png";
import "../Styles/Pages/NotFound.css"

export const NotFound = () => {
    return <>
        <div className="not-found__container">
            <img src={cat} alt="" className="not-found__image" />
            <p className="not-found__text">Not found :(</p>
        </div>
    </>
}
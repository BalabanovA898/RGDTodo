import image from "../images/sad_cat_transparent_bg.png";
import "../Styles/Components/Spinner.css"

interface Props {
    isActive?: boolean;
}

export const Spinner = (props: Props) => {
    return <div className="spinner-container"style={{display: props.isActive || props.isActive === undefined ? "block" : "none"}}>
        <img className="spinner" src={image} alt="Not a placeholder"/>        
    </div>
}
import { useState } from "react"
import ICarouselItem from "../Interfaces/ICarouselItem"
import "../Styles/Components/CarouselItem.css"

import share from "../images/icons/share.png";
import edit from "../images/icons/edit.png";
import deleteIcon from "../images/icons/delete.png";



interface Props {
    item: ICarouselItem
}

export const CarouselItem = (props: Props) => {
    const [isHover, setHover] = useState<boolean>(false);

    return <div className="carousel__item__container" 
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
        <h3 className="carousel__item__header">{props.item.name}</h3>
        {
            isHover && <div className="carousel__item__controls">
                <button id="edit-btn" className="carousel__item__controls__btn">
                    <img className="carousel__item__controls__icon" src={edit} alt="edit" /></button>
                <button id="share-btn" className="carousel__item__controls__btn">
                    <img className="carousel__item__controls__icon" src={share} alt="share" /></button>
                <button id="delete-btn" className="carousel__item__controls__btn">
                    <img className="carousel__item__controls__icon" src={deleteIcon} alt="delete" /></button>
            </div>
        }
    </div>
}
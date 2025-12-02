import { useEffect, useState } from "react";
import ICarouselItem from "../Interfaces/ICarouselItem"
import { CarouselItem } from "./CarouselItem";
import "../Styles/Components/Carousel.css"

interface Props {
    items: ICarouselItem[];
    maxItemsOnScreen: number;
}

export const Carousel = (props: Props) => {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const [itemsToShow, setItemsToShow] = useState<ICarouselItem[]>([]);
    useEffect(() => {
        setItemsToShow(props.items.slice(currentOffset, 
            (currentOffset + props.maxItemsOnScreen)));
    }, [currentOffset]);
    return <>
    {
        props.items.length > 0 ?
        <div className="carousel__container">
            <button className="carousel__controls-btn"
            onClick={() => {
                setCurrentOffset((currentOffset - 1 >= 0 ? currentOffset - 1 : props.items.length - 1)%props.items.length)
                console.log(currentOffset);
            }}>{"<"}</button>
            {
            itemsToShow.map(item => <CarouselItem item={item} key={item.id}></CarouselItem>)
            }
            <button className="carousel__controls-btn"
             onClick={() => {
                setCurrentOffset((currentOffset + 1)%props.items.length)
            }}>{">"}</button>
        </div> :
        <div style={{color: "#fff"}}>No projects?</div>
    }
    </>
}
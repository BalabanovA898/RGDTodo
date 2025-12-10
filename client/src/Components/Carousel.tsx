import { useEffect, useState } from "react";
import ICarouselItem from "../Interfaces/ICarouselItem"
import { CarouselItem } from "./CarouselItem";
import "../Styles/Components/Carousel.css"
import IProjectDTO from "../models/response/ProjectDTO";

interface Props {
    items: IProjectDTO[];
    maxItemsOnScreen: number;
}

export const Carousel = (props: Props) => {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const [itemsToShow, setItemsToShow] = useState<IProjectDTO[]>([]);
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
            }}>{"<"}</button>
            {
            itemsToShow.map((item, index) => <CarouselItem item={item} key={index}></CarouselItem>)
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
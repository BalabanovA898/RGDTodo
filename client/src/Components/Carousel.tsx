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
        if (props.items.length > props.maxItemsOnScreen)
            setItemsToShow(props.items.slice(currentOffset, 
                (currentOffset + props.maxItemsOnScreen)));
        else setItemsToShow(props.items);
    }, [currentOffset]);
    return <>
    {
        props.items.length > 0 ?
        <div className="carousel__container">
            { props.items.length > props.maxItemsOnScreen && <button className="carousel__controls-btn"
            onClick={() => {
                setCurrentOffset((currentOffset - 1 >= 0 ? currentOffset - 1 : props.items.length - 1)%props.items.length)
            }}>{"<"}</button>}
            {
            itemsToShow.map((item, index) => <CarouselItem item={item} key={index}></CarouselItem>)
            }
            { props.items.length > props.maxItemsOnScreen && <button className="carousel__controls-btn"
             onClick={() => {
                setCurrentOffset((currentOffset + 1)%props.items.length)
            }}>{">"}</button>}
        </div> :
        <div style={{color: "#fff"}}>No projects?</div>
    }
    </>
}
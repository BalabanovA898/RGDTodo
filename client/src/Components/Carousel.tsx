import { Dispatch, useEffect, useState } from "react";
import { CarouselItem } from "./CarouselItem";
import "../Styles/Components/Carousel.css"
import IProjectDTO from "../models/response/ProjectDTO";

interface Props {
    items: IProjectDTO[];
    setProjects: Dispatch<IProjectDTO[]>;
    maxItemsOnScreen: number;
}

export const Carousel = (props: Props) => {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const [itemsToShow, setItemsToShow] = useState<IProjectDTO[]>([]);
    
    useEffect(() => {
        if (props.items.length <= props.maxItemsOnScreen) {
            setItemsToShow(props.items);
            return;
        }
        
        const endIndex = currentOffset + props.maxItemsOnScreen;
        let slicedItems: IProjectDTO[];
        
        if (endIndex <= props.items.length) {
            slicedItems = props.items.slice(currentOffset, endIndex);
        } else {
            const itemsFromStart = endIndex - props.items.length;
            slicedItems = [
                ...props.items.slice(currentOffset),
                ...props.items.slice(0, itemsFromStart)
            ];
        }
        
        setItemsToShow(slicedItems);
    }, [currentOffset, props.items]); 
    
    const handlePrev = () => {
        setCurrentOffset(prev => 
            prev === 0 ? props.items.length - 1 : prev - 1
        );
    };
    
    const handleNext = () => {
        setCurrentOffset(prev => 
            (prev + 1) % props.items.length
        );
    };
    
    return <>
        {
            props.items.length > 0 ?
            <div className="carousel__container">
                { props.items.length > props.maxItemsOnScreen && 
                    <button className="carousel__controls-btn" onClick={handlePrev}>
                        {"<"}
                    </button>
                }
                {
                    itemsToShow.map((item, index) => 
                        <CarouselItem projects={props.items} setProjects={props.setProjects} item={item} key={index}></CarouselItem>
                    )
                }
                { props.items.length > props.maxItemsOnScreen && 
                    <button className="carousel__controls-btn" onClick={handleNext}>
                        {">"}
                    </button>
                }
            </div> :
            <div style={{color: "#fff"}}>No projects?</div>
        }
    </>
}
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
        // Обновляем itemsToShow при изменении items, maxItemsOnScreen или currentOffset
        if (props.items.length <= props.maxItemsOnScreen) {
            setItemsToShow(props.items);
            return;
        }
        
        // Правильно вычисляем срез для карусели
        const endIndex = currentOffset + props.maxItemsOnScreen;
        let slicedItems: IProjectDTO[];
        
        if (endIndex <= props.items.length) {
            slicedItems = props.items.slice(currentOffset, endIndex);
        } else {
            // Если выходим за границы массива, берем элементы с начала
            const itemsFromStart = endIndex - props.items.length;
            slicedItems = [
                ...props.items.slice(currentOffset),
                ...props.items.slice(0, itemsFromStart)
            ];
        }
        
        setItemsToShow(slicedItems);
    }, [currentOffset, props.items, props.maxItemsOnScreen]); // Добавили зависимости
    
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
                        <CarouselItem item={item} key={index}></CarouselItem>
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
import { Button } from "./Button"
import "../Styles/Components/Projects.css"
import { Carousel } from "./Carousel"
import { Dispatch, useContext, useEffect, useState } from "react"
import IProjectDTO from "../models/response/ProjectDTO"
import ProjectService from "../services/ProjectService"
import { observable } from "mobx"
import { Context } from ".."
import { observer } from "mobx-react-lite"

interface Props {
    setModalActive: Dispatch<boolean>,
    projects: IProjectDTO[]
}

export const Projects = observer((props: Props) => {
    const {store} = useContext(Context);

    return <div className="projects__container">
        <div className="projects__header__container">
            <h1 className="projects__header__text">Your projects:</h1>
            <Button 
                className="projects__header__btn"
                onClick={() => props.setModalActive(true)}
            >New</Button> 
        </div>
        <Carousel items={props.projects} maxItemsOnScreen={5}></Carousel>
    </div>
});
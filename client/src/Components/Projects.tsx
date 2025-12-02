import { Button } from "./Button"
import "../Styles/Components/Projects.css"
import { Carousel } from "./Carousel"

export const Projects = () => {
    return <div className="projects__container">
        <div className="projects__header__container">
            <h1 className="projects__header__text">Your projects:</h1>
            <Button className="projects__header__btn">New</Button> 
        </div>
        <Carousel items={[]} maxItemsOnScreen={5}></Carousel>
    </div>
}
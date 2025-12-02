import { Button } from "../Components/Button"
import { Header } from "../Components/Header"
import { Projects } from "../Components/Projects"
import "../Styles/Pages/Home.css"

interface Props {

}


export const Home = (props: Props) => {
    return <div className="home__container">
        <Header></Header>
        <Projects></Projects>
    </div>
}
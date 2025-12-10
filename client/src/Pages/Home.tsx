import { useContext, useEffect, useState } from "react"
import { Button } from "../Components/Button"
import { Header } from "../Components/Header"
import {Projects} from "../Components/Projects"
import "../Styles/Pages/Home.css"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { Navigate, useNavigate } from "react-router-dom"
import { Modal } from "../Components/Modal"
import { CreateProjectModal } from "../Components/CreateProjectModal"
import ProjectService from "../services/ProjectService"
import IProjectDTO from "../models/response/ProjectDTO"
import Notification from "../Classes/Notification"

interface Props {

}


export const Home = observer((props: Props) => {
    const {store} = useContext(Context);

    const [createProjectModalActive, setCreateProjectModalActive] = useState<boolean>(false);
    const [projects, setProjects] = useState<IProjectDTO[]>([]);

    const navigate = useNavigate();

    function createNewProject (title: string, description: string) {
        ProjectService.createNewProject(title, description, store.user.id).then((id) => {
            setProjects([{
                Id: id,
                Title: title,
                Description: description,
                UserId: store.user.id
            }]);
        store.notifications.push(new Notification("notification", "Projects was succesfully created"))
        }).catch(e => store.notifications.push(new Notification("error", e.message)));
    }

    useEffect(() => {
        if (localStorage.getItem("session")) 
            store.checkAuth().then((res:boolean) => {
                if (!res) {
                    store.notifications.push(new Notification("error", "You must log in to get acces to this page"))
                    navigate("/")
                }
            }).then(
                () => ProjectService.getAllUserProjects(store.user.id).then(res => {
                    if (typeof res === "string")
                    {
                        store.notifications.push(new Notification("error", res));
                        setProjects([]);
                    } else 
                        setProjects(res)
                })
            );
        else {
            store.notifications.push(new Notification("error", "You must log in to get acces to this page"))
            navigate("/")
        }
    }, [])

    return !store.isLoading ?
        <div className="home__container">
            <Header></Header>
            <Projects 
                setModalActive={setCreateProjectModalActive}
                projects={projects}
            ></Projects>
            <CreateProjectModal 
                active={createProjectModalActive}
                setActive={setCreateProjectModalActive}
                createNewProject={createNewProject}
            ></CreateProjectModal>
        </div>
         : <p>TODO: MAKE SPINNER</p>
});
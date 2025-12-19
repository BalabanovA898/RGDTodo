import { useContext, useState } from "react"
import ICarouselItem from "../Interfaces/ICarouselItem"
import "../Styles/Components/CarouselItem.css"

import share from "../images/icons/share.png";
import edit from "../images/icons/edit.png";
import deleteIcon from "../images/icons/delete.png";
import IProjectDTO from "../models/response/ProjectDTO";
import { Context } from "..";
import ProjectService from "../services/ProjectService";
import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Notification from "../Classes/Notification";



interface Props {
    
    item: IProjectDTO
}

export const CarouselItem = observer((props: Props) => {
    const [isHover, setHover] = useState<boolean>(false);
    const [isEditing, setEditing] = useState<boolean>(false);

    const {store} = useContext(Context);

    const [newTitle, setNewTitle] = useState<string>((props.item as any).title);
    const [newDescription, setNewDescription] = useState((props.item as any).description);

    const navigate = useNavigate();

    async function deleteProject () {
        try {
            await ProjectService.deleteProject((props.item as any).id, store.user.id);
        } catch (e: any) {
            console.log(e)
            store.notifications.push(new Notification("error", e.response.data));        
        } 
    }

    return <div className="carousel__item__container" 
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
        {isEditing ?
        <div className="carousel__item__info__container">
            <Input
            onChange={setNewTitle}
            value={newTitle}
            type="text"></Input>
            <Input
            onChange={setNewDescription}
            value={newDescription}
            type="text"></Input>
            <Button onClick={() => {
                setNewTitle((props.item as any).title);
                setNewDescription((props.item as any).description);
                setEditing(false);
            }}>Cancel</Button>
            <Button onClick={async () => {
                try {
                    await ProjectService.editProject((props.item as any).id, newTitle, newDescription, store.user.id);
                } catch (e: any) {
                    store.notifications.push(new Notification("error", e.response.data));        
                }
                setEditing(false);
            }}>Save</Button>
        </div>
        :
        <div className="carousel__item__info__container" onClick={() => navigate(`/project/${(props.item as any).id}`)}>
            <h3 className="carousel__item__header">{(props.item as any).title}</h3>
            <p>{(props.item as any).description}</p>
        </div>
        }
        {
            isHover && !isEditing && <div className="carousel__item__controls">
                <button id="edit-btn" className="carousel__item__controls__btn" onClick={() => setEditing(true)}>
                    <img className="carousel__item__controls__icon" src={edit} alt="edit"/></button>
                <button id="share-btn" className="carousel__item__controls__btn" onClick={() => navigator.clipboard.write([new ClipboardItem({["text/plain"]: `http://localhost:3000/share-link/${(props.item as any).id}`})])}>
                    <img className="carousel__item__controls__icon" src={share} alt="share" /></button>
                <button id="delete-btn" className="carousel__item__controls__btn" onClick={deleteProject}>
                    <img className="carousel__item__controls__icon" src={deleteIcon} alt="delete" /></button>
            </div>
        }
    </div>
})
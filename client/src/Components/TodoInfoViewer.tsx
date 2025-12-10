
import { Dispatch, useContext, useEffect, useRef, useState } from "react";
import "../Styles/Components/TodoInfoViewer.css"
import Todo from "../Classes/Todo";

import plus from "../images/icons/plus.png";
import edit from "../images/icons/edit.png";
import deleteIcon from "../images/icons/delete.png";
import person from "../images/icons/person.png";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Notification from "../Classes/Notification";

interface Props {
    todo?: Todo;
    editNode: (newNode: Todo) => void;
    checkTodoToBeDone: (id: string) => boolean | undefined;
    setAddChildModalActive: Dispatch<boolean>;
    deleteTodo: (id: string) => void;
    setManageUsersModalActive: Dispatch<boolean>;
}

export const TodoInfoViewer = observer((props: Props) => {
    const [statusActive, setStatusActive] = useState<boolean>(false);
    const [isTitleEditing, setTitleEditing] = useState<boolean>(false);
    const [isDescriptionEditing, setDescriptionEditing] = useState<boolean>(false);

    const [newTitle, setNewTitle] = useState<string>(props.todo?.title || "");
    const [newDescription, setNewDescription] = useState<string>(props.todo?.description || "");

    const [newDate, setNewDate] = useState<Date>();

    const datePicker = useRef<HTMLInputElement>(null);

    const {store} = useContext(Context);

    return props.todo ? <div className="todo-info-viewer__container"
    onKeyDown={(e) => {
        if (isTitleEditing && e.key === 'Escape')
        setTitleEditing(false);
        if (isDescriptionEditing && e.key === 'Escape')
        setDescriptionEditing(false);
    }}>
        <div className="todo-info-decription__container">
            {!isTitleEditing 
            ? <h1 className="todo-info-description-title" onClick={() => setTitleEditing(true)}>{props.todo?.title}</h1> 
            : <input className="todo-info-description-title__edit" value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={
                (e) => {
                    if (e.key === 'Enter') {
                        if (props.todo) {
                            let newNode = props.todo;
                            newNode.title = newTitle;
                            props.editNode(newNode);
                            setTitleEditing(false);
                        }
                    }
                }
            }></input>}
            { !isDescriptionEditing ?
                <h2 className="todo-info-description-description" onClick={() => setDescriptionEditing(true)}>{props.todo?.description || "No description"}</h2>
                : <input className="todo-info-description-title__edit" value={newDescription} onChange={e => setNewDescription(e.target.value)} onKeyDown={
                (e) => {
                    if (e.key === 'Enter') {
                        if (props.todo) {
                            let newNode = props.todo;
                            newNode.description = newDescription;
                            props.editNode(newNode);
                            setDescriptionEditing(false);
                        }
                    }
                }
            }></input>}
        </div>
        <div className="todo-info-controls__container">
            <div className="todo-info-status-select-header" onClick={() => setStatusActive(!statusActive)}>
                <h2>{props.todo.status}</h2> {
                    statusActive && <div className="todo-info-status-select-options">
                        <p onClick={() => {
                            if (props.todo) {
                                let newNode = props.todo;
                                newNode.status="WIP"
                                props.editNode(newNode);
                            } 
                        }}>WIP</p>
                        <p onClick={() => {
                            if (props.todo) {
                                let newNode = props.todo;
                                if (props.checkTodoToBeDone(props.todo.id)) {
                                    newNode.status="DONE"
                                    props.editNode(newNode);
                                } else {
                                    store.notifications.push(new Notification("error", "You must to do all sub task to do this one"));
                                }
                            }
                        }}>DONE</p>
                        <p onClick={() => {
                            if (props.todo) {
                                let newNode = props.todo;
                                newNode.status="CANCELLED"
                                props.editNode(newNode);
                            }
                        }}>CANCELLED</p>
                    </div>
            }
            </div>
            <div className="todo-info-controls-deadline">
                <input ref={datePicker} type="date" style={{opacity: 0, position: "absolute", right: "30px"}}
                    onChange={e => {
                        setNewDate(new Date(e.target.value));
                        if (props.todo) {
                            let newNode = props.todo;
                            newNode.deadline = newDate;
                            props.editNode(newNode);
                        }
                    }}
                />
                <p onClick={() => {
                    datePicker.current?.click();
                }}>{props.todo.deadline ? new Date(props.todo.deadline).toDateString() : "No deadline"}⏲</p>
            </div>   
            <div className="todo-info-controls-btns">
                <button id="todo-add-btn" className="todo-info-controls-btn"><img src={plus} alt="Add child" onClick={() => props.setAddChildModalActive(true)}></img></button>
                <button id="todo-assign-btn" className="todo-info-controls-btn" onClick={() => props.setManageUsersModalActive(true)}><img src={person} alt="Manage assigned"></img></button>
                <button id="todo-delete-btn" className="todo-info-controls-btn"><img src={deleteIcon} alt="Remove todo" onClick={() => props.deleteTodo(props.todo?.id || "")}></img></button>
            </div>
        </div>
    </div> : <div className="todo-info-viewer__container placholder"><p>CLICK ON TODO</p></div>
})
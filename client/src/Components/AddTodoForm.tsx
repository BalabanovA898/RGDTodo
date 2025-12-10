import { Dispatch, useContext, useState } from "react";
import Todo from "../Classes/Todo"
import { Modal } from "./Modal";
import { Input } from "./Input";
import "../Styles/Components/AddTodoForm.css";
import { Button } from "./Button";
import { timeLog } from "console";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Notification from "../Classes/Notification";

interface Props {
    addChild: (id: string, newNode: Todo) => void;
    active: boolean;
    setActive: Dispatch<boolean>;
    selectedNode?: Todo;
}

export const AddTodoForm = observer((props: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date>(new Date("1999-01-01"));

    const {store} = useContext(Context);

    const projectId = useLocation().pathname.split("/").at(-1);

    return <Modal active={props.active} setActive={props.setActive}>
        <form className="add-child-form-container">
            <Input type="text" placeholder="Title" onChange={setTitle}></Input>
            <Input type="text" placeholder="Description" onChange={setDescription}></Input>
            <Input type="date" onChange={(e) => {setDeadline(new Date(e))}}></Input>
            <div className="add-child-form_buttons">
                <Button onClick={() => props.setActive(false)}>Cancel</Button>
                <Button onClick={() => {
                    if (props.selectedNode?.deadline && deadline < props.selectedNode?.deadline)
                        store.notifications.push(new Notification("error", "Wrong deadline"));    
                    if (props.selectedNode) {
                        const newTodo = new Todo(
                            Date.now().toString(),
                            title,
                            "CREATED",
                            projectId || "",
                            description,
                            props.selectedNode.id,
                            deadline,
                        );
                       props.addChild(props.selectedNode.id, newTodo);                    
                    }
                    props.setActive(false);
                }}>Create</Button>
            </div>
        </form>
    </Modal>
})
import { Dispatch, useState } from "react";
import Todo from "../Classes/Todo"
import { Modal } from "./Modal";
import { Input } from "./Input";
import "../Styles/Components/AddTodoForm.css";
import { Button } from "./Button";
import { timeLog } from "console";

interface Props {
    addChild: (id: string, newNode: Todo) => void;
    active: boolean;
    setActive: Dispatch<boolean>;
    selectedNode?: Todo;
}

export const AddTodoForm = (props: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date>(new Date("1999-01-01"));

    return <Modal active={props.active} setActive={props.setActive}>
        <form className="add-child-form-container">
            <Input type="text" placeholder="Title" onChange={setTitle}></Input>
            <Input type="text" placeholder="Description" onChange={setDescription}></Input>
            <Input type="date" onChange={(e) => {setDeadline(new Date(e))}}></Input>
            <div className="add-child-form_buttons">
                <Button onClick={() => props.setActive(false)}>Cancel</Button>
                <Button onClick={() => {
                    if (deadline.getTime() < (props.selectedNode?.deadline || 0))
                        throw new Error("Wrong deadline");
                    if (props.selectedNode)
                    props.addChild(props.selectedNode.id ,new Todo(
                        Date.now().toString(),
                        title,
                        description,
                        deadline.getTime(),
                        "CREATED"
                    ));
                    props.setActive(false);
                }}>Create</Button>
            </div>
        </form>
    </Modal>
}
import { Dispatch, useState } from "react"
import { Modal } from "./Modal"
import { Input } from "./Input";
import { Button } from "./Button";


interface Props {
    active: boolean,
    setActive: Dispatch<boolean>,
    createNewProject: (title: string, description: string) => void;
}

export const CreateProjectModal = (props: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    return <Modal 
    active={props.active}
    setActive={props.setActive}>
        <Input type="text" 
            placeholder="title"
            onChange={setTitle}
            value={title}></Input>
        <Input type="text" 
            placeholder="description"
            onChange={setDescription}
            value={description}></Input>
        <Button onClick={() => {
            setTitle("")
            setDescription("");
            props.setActive(false);
        }}>Cancel</Button>
        <Button onClick={() => {
            props.createNewProject(title, description);
            setTitle("")
            setDescription("");
            props.setActive(false);
        }}>
            Create
        </Button>
    </Modal>
}
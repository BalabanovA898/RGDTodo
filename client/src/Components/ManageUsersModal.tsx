import { Dispatch, useEffect, useState } from "react";
import { Modal } from "./Modal";
import User from "../Classes/User";
import Todo from "../Classes/Todo";

import "../Styles/Components/ManageUsersModal.css"
import { Button } from "./Button";

interface Props {
    active: boolean;
    setActive: Dispatch<boolean>;
    projectUsers: User[];
    todo?: Todo;
    editTodo: (newValue: Todo) => void;
}

export const ManageUsersModal = (props: Props) => {
    const [notAssigendUsers, setNotAssignedUsers] = useState<User[]>(props.projectUsers.filter(item => !props.todo?.assigned.some(i => i.id === item.id)));
    
    function moveUserFromAssigned(id: string) {
        let todoCopy = props.todo;
        let newUser =  todoCopy?.assigned.find(item => item.id === id);
        if (todoCopy?.assigned) {
            todoCopy.assigned = todoCopy?.assigned.filter(item => item.id !== id);
            props.editTodo(todoCopy);
        }
        if (newUser)
            setNotAssignedUsers([...notAssigendUsers, newUser]);

    }

    useEffect(() => {
        setNotAssignedUsers(props.projectUsers.filter(item => !props.todo?.assigned.some(i => i.id === item.id)));
    }, [props.todo])

    function moveUserToAssigned(id: string) {
        let todoCopy = props.todo;
        let newUser = notAssigendUsers.find(item => item.id === id);
        setNotAssignedUsers(notAssigendUsers.filter(item => item.id !== id));
        if (newUser && todoCopy?.assigned) {
            todoCopy.assigned = [...todoCopy?.assigned, newUser];
            props.editTodo(todoCopy);
        }
    }

    return <Modal active={props.active} setActive={props.setActive}>
        <div className="todo__users__container">
            <div className="assigned-users">
                {
                    props.todo?.assigned.map(user => <div className="user-element">
                        <p>{user.username}</p>
                        <button className="user-element__btn" onClick={() => moveUserFromAssigned(user.id)}>↓</button>
                    </div>)
                }
            </div>
            <p className="todo__users__text">↑assigned↑ ↓other↓</p>
            <div className="all-users">
                {
                    notAssigendUsers.map(user => <div className="user-element">
                        <p>{user.username}</p>
                        <button className="user-element__btn" onClick={() => moveUserToAssigned(user.id)}>↑</button>
                    </div>)
                }
            </div>
            <Button onClick={() => props.setActive(false)}>Close</Button>
        </div>
    </Modal>
}
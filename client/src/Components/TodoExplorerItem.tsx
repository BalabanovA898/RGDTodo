import { useState } from "react"
import TodoInfoTreeNode from "../Classes/TodoInfoTreeNode"
import "../Styles/Components/TodoExplorerItem.css"

interface Props {
    item: TodoInfoTreeNode;
    isSelected: boolean;
    onClick: (id: TodoInfoTreeNode) => void;
}

export const TodoExplorerItem = (props: Props) => {
    const [active, setActive] = useState<boolean>(false);
    const [isTodoSelected, setTodoSelected] = useState<boolean>(props.isSelected);
    return <div className={["todo-explorer-item__container"].join(" ")}>
        <h3 className="todo-explorer-item__titl"
        onContextMenu={(e) => {
            props.onClick(props.item);
            e.preventDefault();
        }} 
        onClick={(e) => {
            if (e.nativeEvent.button === 0)
                setActive(!active);
        }    
        }>{props.item.value.title}</h3>
        {
            active && props.item.children && 
                <div className="todo-explorer-item__children">
                    {props.item.children.map(item => 
                    <TodoExplorerItem 
                        item={item} 
                        key={item.value.id} 
                        isSelected={isTodoSelected}
                        onClick={props.onClick}></TodoExplorerItem>)}
                </div>
        }
    </div>
}
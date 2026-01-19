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
        <div onContextMenu={(e) => {
            props.onClick(props.item);
            e.preventDefault();
        }} 
        onClick={(e) => {
            if (e.nativeEvent.button === 0)
                setActive(!active);
        }}   className="todo-explorer__item__header-container" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h3 className="todo-explorer-item__title">{props.item.value.title}</h3>
            <svg width="10px" height="10px" viewBox="0 0 20 20" style={{
                rotate: active ? "180deg" : "0deg"
            }}>
                <path d="M 10 2 L 18 18 L 2 18" stroke="#fff" fill="#fff" strokeWidth={2}></path>
            </svg>
        </div>
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

import TodoInfoTreeNode from "../Classes/TodoInfoTreeNode";
import "../Styles/Components/TodoExplorer.css"
import { TodoExplorerItem } from "./TodoExplorerItem";

interface Props {
    root: TodoInfoTreeNode;
    onTodoSelect: (node: TodoInfoTreeNode) => void;
}

export const TodoExplorer = (props: Props) => {
    return <div className="todo-explorer__container">
        <TodoExplorerItem 
            item={props.root}
            isSelected={false}
            onClick={props.onTodoSelect}
        ></TodoExplorerItem>
    </div>
}
import { useState } from "react"
import TodoInfoTreeNode from "../Classes/TodoInfoTreeNode"
import { TodoExplorer } from "../Components/TodoExplorer"
import { TreeDiagram } from "../Components/TreeDiagram"
import "../Styles/Pages/Project.css"
import { TodoInfoViewer } from "../Components/TodoInfoViewer"
import { Header } from "../Components/Header"
import Todo from "../Classes/Todo"
import { nodeModuleNameResolver } from "typescript"
import { Modal } from "../Components/Modal"
import { AddTodoForm } from "../Components/AddTodoForm"


export const ProjectTodos = () => {
    const [root, setRoot] = useState<TodoInfoTreeNode>(new TodoInfoTreeNode(new Todo("1","1", "Some text", Date.now(), "CREATED"), [
        new TodoInfoTreeNode(new Todo("2","2", "Some text", Date.now(), "CREATED"), [], null),
        new TodoInfoTreeNode(new Todo("3","3", "Some text", Date.now(), "CREATED"), [], null),
        new TodoInfoTreeNode(new Todo("4","4", "Some text", Date.now(), "CREATED"), [], null)
    ], null));

    const [selectedNode, setSelectedNode] = useState<TodoInfoTreeNode | undefined>(undefined);

    const [isAddChildModalActive, setAddChildModalActive] = useState<boolean>(false);

    function editNode (newNode: Todo) {
        let root_copy = root;
        root_copy.editNodeWithId(newNode.id, newNode);
        setRoot(root_copy);
    }

    function addChild (parentId: string, newNode: Todo) {
        let root_copy = root;
        console.log(newNode);
        root_copy.addChildToNodeWithId(parentId, newNode);
        setRoot(root_copy);
    }

    return <div className="project__todos__container">
    <Header></Header>
    <AddTodoForm 
        addChild={addChild} 
        active={isAddChildModalActive} 
        setActive={setAddChildModalActive}
        selectedNode={selectedNode?.value}></AddTodoForm>
    <div className="project__todos__todos__container">
       <TodoExplorer root={root} onTodoSelect={(node) => setSelectedNode(node)}></TodoExplorer> 
       <div className="project__todos__main-part__container">
            <TreeDiagram root={selectedNode}></TreeDiagram>
            <TodoInfoViewer 
                checkTodoToBeDone={root.checkTodoToBeDone.bind(root)} 
                editNode={editNode} 
                todo={selectedNode?.value}
                setAddChildModalActive={setAddChildModalActive}
            ></TodoInfoViewer>
       </div>
    </div>
    </div>
}
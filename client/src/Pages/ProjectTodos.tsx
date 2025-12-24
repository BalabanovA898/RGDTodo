import { useContext, useEffect, useState } from "react"
import TodoInfoTreeNode from "../Classes/TodoInfoTreeNode"
import { TodoExplorer } from "../Components/TodoExplorer"
import { TreeDiagram } from "../Components/TreeDiagram"
import "../Styles/Pages/Project.css"
import { TodoInfoViewer } from "../Components/TodoInfoViewer"
import { Header } from "../Components/Header"
import Todo from "../Classes/Todo"
import { AddTodoForm } from "../Components/AddTodoForm"
import User from "../Classes/User"
import { ManageUsersModal } from "../Components/ManageUsersModal"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { useLocation, useNavigate } from "react-router-dom"
import TodosService from "../services/TodosService"
import Notification from "../Classes/Notification"
import UserService from "../services/UserService"
import { Spinner } from "../Components/Spinner"


export const ProjectTodos = observer(() => {
    const {store} = useContext(Context);
    
    const navigate = useNavigate();
    const projectId = useLocation().pathname.split("/").at(-1);
   
    const [projectUsers, setProjectUsers] = useState<User[]>([]);

    useEffect(() => {
        if (localStorage.getItem("session")) {
            store.setLoading(true);
            store.checkAuth().then((res:boolean) => {
                if (!res) {
                    store.notifications.push(new Notification("error", "You must log in to get acces to this page"));
                    store.setLoading(false);
                    navigate("/")
                }
            }).then(
                async () => {
                    fetchTodos();
                    const res = await UserService.getProjectUsers(projectId || "");
                    if (typeof res === "string")
                        store.notifications.push(new Notification("error", res));
                    else
                        setProjectUsers(res.data);
                }
            ).finally(() => store.setLoading(false));
        }
        else {
            store.notifications.push(new Notification("error", "You must log in to get acces to this page"))
            store.setLoading(false);
            navigate("/")
        }
    }, []);

    async function fetchTodos () { 
        if (projectId) {
            const res = await TodosService.getAllProjectTodos(projectId);
            if (typeof res === "string")
                store.notifications.push(new Notification("error", res))
            else {
                let todos = res?.data;
                if (todos) {
                    const rootNode = todos.find(item => !item.parentId);
                    if (rootNode) {
                        const newRoot = new TodoInfoTreeNode(rootNode, [], null);
                        let nodes = [rootNode.id];
                        let index = 0;
                        while (index < nodes.length) {
                            todos.forEach(todo => {
                                if (todo.parentId === nodes[index]) {
                                    newRoot.addChildToNodeWithId(todo.parentId, todo);
                                    nodes.push(todo.id);
                                }
                            });
                            index += 1;
                        } 
                        setRoot(newRoot);
                    }
                }
            }
        }
    } 

    const [root, setRoot] = useState<TodoInfoTreeNode>(new TodoInfoTreeNode(new Todo("1","1","CREATED", "", "Some text", undefined, new Date(Date.now())), [], null));

    const [selectedNode, setSelectedNode] = useState<TodoInfoTreeNode | undefined>(undefined);

    const [isAddChildModalActive, setAddChildModalActive] = useState<boolean>(false);

    const [isManageUsersModalActive, setManageUsersModalActive] = useState<boolean>(false);

    async function editNode (newNode: Todo) {
        const res = await TodosService.updateTodo(newNode);
        if (res) {
            store.notifications.push(new Notification("error", res));
            return;
        }
        let root_copy = root;
        root_copy.editNodeWithId(newNode.id, newNode);
        setRoot(root_copy);
    }

    async function addChild (parentId: string, newNode: Todo) {
        let root_copy = root;
        let res = await TodosService.addNewTodo(newNode);
        if (res[0]) {
            newNode.id = res[1];
            root_copy.addChildToNodeWithId(parentId, newNode);
            setRoot(root_copy);
        }
        else
            store.notifications.push(new Notification("error", res[1])); 
    }

    async function deleteTodo (id: string) {
        const res = await TodosService.deleteTodo(id);
        if (res) {
            store.notifications.push(new Notification("error", res));
            return;
        }
        let root_copy = root;
        root_copy.deleteTodo(id);
        setRoot(root_copy);
    }

    return <div className="project__todos__container">
        {store.isLoading && <Spinner></Spinner>}
    <Header></Header>
    <AddTodoForm 
        addChild={addChild} 
        active={isAddChildModalActive} 
        setActive={setAddChildModalActive}
        selectedNode={selectedNode?.value}></AddTodoForm>
    <ManageUsersModal 
        active={isManageUsersModalActive}
        setActive={setManageUsersModalActive}
        projectUsers={projectUsers}
        todo={selectedNode?.value}
        editTodo={editNode}
    ></ManageUsersModal>
    <div className="project__todos__todos__container">
       <TodoExplorer root={root} onTodoSelect={(node) => setSelectedNode(node)}></TodoExplorer> 
       <div className="project__todos__main-part__container">
            <TreeDiagram root={selectedNode}></TreeDiagram>
            <TodoInfoViewer 
                checkTodoToBeDone={root.checkTodoToBeDone.bind(root)} 
                editNode={editNode} 
                todo={selectedNode?.value}
                setAddChildModalActive={setAddChildModalActive}
                deleteTodo={deleteTodo}
                setManageUsersModalActive={setManageUsersModalActive}
            ></TodoInfoViewer>
       </div>
    </div>
    </div>
});
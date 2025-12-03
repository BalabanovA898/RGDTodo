
import Todo from "./Todo";

export default class TodoInfoTreeNode {
    public value: Todo;
    public name: string;
    public children: TodoInfoTreeNode[] | undefined;
    public root: string | null;

    constructor (value: Todo, children : TodoInfoTreeNode[], root: string | null) {
        this.value = value;
        this.children = children;
        this.root = root;
        this.name = value.title;
    }

    editNodeWithId(id: string, newValue: Todo): void {
        if (this.value.id === id) {
            this.name = newValue.title;
            this.value = newValue;
        } else {
            this.children?.forEach(item => item.editNodeWithId(id, newValue));
        }
    }
    
    addChildToNodeWithId(id: string, newNode: Todo) {
        console.log(this);
        if (this.value.id === id) {
            this.children?.push(new TodoInfoTreeNode(newNode, [], this.value.id))
        } else {
            this.children?.forEach(item => item.addChildToNodeWithId(id, newNode));
        }
    }

    checkTodoToBeDone (id: string): boolean | undefined {
        if (this.value.id === id) {
            if (!this.children || !this.children.length) return true;
            return this.children.every(item => item.value.status === "DONE" || item.value.status === "CANCELLED");
        } else if (this.children) {
            for (let item of this.children) {
                let result = item.checkTodoToBeDone(id);
                if (result !== undefined) return result;
            }
        }
        else {
            return undefined;
        }
    }
}
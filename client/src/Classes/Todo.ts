import { TaskState } from "../Enums/TaskState";
import User from "./User";

export default class Todo {
    public id: string;
    public title: string;
    public description: string;
    public deadline: number;
    public status: TaskState;
    public assigned: User[];

    public constructor (id: string, title: string, description: string, deadline: number, status: TaskState, assigned: User[] = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.assigned = assigned;
    }
}
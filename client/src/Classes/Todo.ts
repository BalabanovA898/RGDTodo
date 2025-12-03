import { TaskState } from "../Enums/TaskState";

export default class Todo {
    public id: string;
    public title: string;
    public description: string;
    public deadline: number;
    public status: TaskState;

    public constructor (id: string, title: string, description: string, deadline: number, status: TaskState) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
    }
}
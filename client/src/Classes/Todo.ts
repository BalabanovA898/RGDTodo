import { TaskState } from "../Enums/TaskState";
import User from "./User";

export default class Todo {
    public id: string;
    public title: string;
    public status: TaskState;
    public projectId: string;
    public parentId?: string;
    public description?: string;
    public deadline?: Date;
    public assigned?: User[];

    public constructor (id: string, title: string, status: TaskState, projectId: string,  description?: string, parentId?: string, deadline?: Date, assigned?: User[]) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.projectId = projectId;
        this.parentId = parentId;
        this.description = description;
        this.deadline = deadline;
        this.assigned = assigned;
    }
}
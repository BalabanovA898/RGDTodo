import { AxiosResponse } from "axios";
import $api from "../http";
import Todo from "../Classes/Todo";

export default class TodosService {
    static async getAllProjectTodos (projectId: string): Promise<AxiosResponse<Todo[]> | string> {
        try {
            const response = $api.get<Todo[]>(`/Task?project-id=${projectId}`);
            return response;
        } catch (e: any) {
            return e.message;
        }
    }

    static async addNewTodo (newTodo: Todo): Promise<[boolean, string]> {
        try {
            const response = await $api.post(`/Task/`, newTodo);
            return [true, response.data];
        } catch (e: any) {
            return [false, e.message];
        }
    }

    static async updateTodo (newTodo: Todo): Promise<string | null> {
        try {
            const response = $api.put(`/Task/`, newTodo);
            return null;
        } catch (e: any) {
            return e.message;
        }
    }

    static async deleteTodo (id: string): Promise<string | null> {
        try {
            const response = $api.delete(`/Task?id=${id}`);
            return null;
        } catch (e: any) {
            return e.message;
        }
    }

    static async assignToTodo (userId: string, taskId: string) : Promise<string | null> {
        try {
            const res = $api.post(`/Task/assign?user-id=${userId}&task-id=${taskId}`);
            return null;
        } catch (e: any) {
            return e.message
        }
    }

    static async removeAssignToTodo (userId: string, taskId: string) : Promise<string | null> {
        try {
            const res = $api.delete(`/Task/assign?user-id=${userId}&task-id=${taskId}`);
            return null;
        } catch (e: any) {
            return e.message
        }
    }
}
import $api from "../http";
import IProjectDTO from "../models/response/ProjectDTO";


export default class ProjectService {
    static async getAllUserProjects (userId: string): Promise<IProjectDTO[] | string> {
        try {
            const response = await $api.get<IProjectDTO[]>(`/projects/projects?user-id=${userId}`);
            return response.data;
        } catch (e : any)  {
            return e.message;
        } 
    }

    static async createNewProject (title: string, description: string, userId: string): Promise<string> {
        try {
            const response = await $api.post("/projects", {
                Title: title,
                Description: description,
                UserId: userId,
            });
            return response.data; 
        } catch (e: any) {
           throw e; 
        }
    }

    static async editProject (projectId:string, title: string, description: string, userId: string): Promise<string> {
        try {
            const response = await $api.put(`/projects?user=${userId}`, {
                Id: projectId,
                Title: title,
                Description: description,
                UserId: userId,
            });
            return response.data; 
        } catch (e: any) {
           throw e; 
        }
    }
    
    static async deleteProject (projectId: string, userId: string): Promise<string> {
        try {
            const response = await $api.delete(`/projects?user=${userId}&id=${projectId}`);
            return response.data; 
        } catch (e: any) {
           throw e; 
        }
    }

    static async AddProjectMember(projectId: string, userId: string) {
        try {
           $api.post(`/project-members?project-id=${projectId}&user-id=${userId}`);
           return null;
        } catch (e: any) {
            return e.message;
        }
    }
}
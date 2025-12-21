import { AxiosResponse } from "axios";
import User from "../Classes/User";
import $api from "../http";

export default class UserService  {
    static getProjectUsers (projectId: string): Promise<AxiosResponse<User[]> | string> {
        try {
            const res = $api.get<User[]>(`/Users?project-id=${projectId}`);
            return res;
        }
        catch (e: any) {
            return e.message;
        }
    }
}
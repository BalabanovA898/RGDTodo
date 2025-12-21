import $api from "../http";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static login (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>("/Auth/login", {email, password}, );
    }

    static register (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>("/Auth/register", {email, password});
    }

    static logout (){
        return $api.post<IAuthResponse>("/Auth/logout");
    }
}
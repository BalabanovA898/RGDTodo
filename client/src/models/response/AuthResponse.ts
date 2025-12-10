import User from "../../Classes/User";

export interface IAuthResponse {
    session: string,
    userDTO: User
}
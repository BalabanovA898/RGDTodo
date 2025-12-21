import $api from "../http";

export default class ProfileService {
    static async updateProfile(id: string, email: string, stacks?: string[], proflePicture?: string, username?: string): Promise<null | string> {
        try {
            const response = await $api.put(`/Users?id=${id}`, {Email: email, Stacks: stacks, ProfilePicture: proflePicture, Username: username});
            return null;
        } catch (e: any) {
            return e.message;
        }
    }; 
}
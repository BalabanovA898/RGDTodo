import { Stack } from "../Enums/Stack";

export default class User {
    id: string;
    public email: string;
    public username: string;
    public proflePicture?: string;
    public stack?: Stack[];

    public constructor (id: string, email: string, username: string, stack?: Stack[], proflePicture?: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.stack = stack;
        this.proflePicture = proflePicture;
    }
}
import { Stack } from "../Enums/Stack";

export default class User {
    id: string;
    public username: string;
    public ppf?: ImageData;
    public stack: Stack[];

    public constructor (id: string, username: string, stack: Stack[], ppf?: ImageData) {
        this.id = id;
        this.username = username;
        this.stack = stack;
        this.ppf = ppf;
    }
}
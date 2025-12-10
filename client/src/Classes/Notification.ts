export default class Notification {
    public status: "error" | "notification";
    public message: string;

    constructor (status: "error" | "notification", message: string) {
        this.status = status;
        this.message = message;
    }
}
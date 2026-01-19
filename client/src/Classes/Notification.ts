export default class Notification {
    public id: number = Date.now();
    public status: "error" | "notification";
    public message: string;
    public updateNotificationList: (id: number) => void;

    constructor (status: "error" | "notification", message: string, unl: (id: number) => void) {
        this.status = status;
        this.message = message;
        this.updateNotificationList = unl;
        
        setTimeout(() => {
            this.updateNotificationList(this.id);
        }, 3000);
    }
}
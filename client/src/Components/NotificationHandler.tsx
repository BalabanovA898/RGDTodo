import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Notification from "../Classes/Notification";
import "../Styles/Components/NotificationHandler.css"

export const NotificationHandler = observer(() => {
    const {store} = useContext(Context);

    return <div className="notification-handler__container">
        <div className="notifications__container">
            {store.notifications.map(item => <div className={`notification-item ${(item as unknown as Notification).status}`}
            onClick={() => {
                store.notifications = store.notifications.filter(i => i.message != item.message);
            }}>
                {(item as unknown as Notification).message}
            </div>)}
        </div>
    </div>
});
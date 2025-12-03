import { PropsWithChildren } from "react";

import "../Styles/Components/Modal.css"

interface Props extends PropsWithChildren {
    active: boolean;
    setActive: (active: boolean) => void;
}

export const Modal = (props: Props) => {
    return <div 
    className="modal__window" 
    style={{display: props.active ? "block" : "none"}}
    >
        {props.children}
    </div>
}
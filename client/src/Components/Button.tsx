import { PropsWithChildren, useRef } from "react"

import "../Styles/Components/Button.css"

interface Props extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
    type?: string;
}

export const Button = (props: Props) => {
    return <button
        formAction=""
        className= {["button", props.className].join(" ")}
        onClick={e => {
            e.preventDefault();
            if (props.onClick)
                props.onClick();
        }}
    >{props.children}</button>
}
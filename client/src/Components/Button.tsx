import { PropsWithChildren, useRef } from "react"

import "../Styles/Components/Button.css"

interface Props extends PropsWithChildren {
    className?: string;
}

export const Button = (props: Props) => {
    return <button 
        className= {["button", props.className].join(" ")}
        onClick={e => {
            e.preventDefault();
        }}
    >{props.children}</button>
}
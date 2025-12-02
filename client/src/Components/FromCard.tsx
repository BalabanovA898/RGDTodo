import { PropsWithChildren } from "react";
import "../Styles/Components/FormCard.css"


export const FormCard = (props: PropsWithChildren) => 
    <form className="form__container">
        {props.children}
    </form>;
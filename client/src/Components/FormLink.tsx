import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

import "../Styles/Components/FormLink.css";

interface Props extends PropsWithChildren{
    endpoint: string;
}

export const FormLink = (props: Props) => {
    return  <div className="link__container">
        <NavLink 
            to={props.endpoint}
            className="form__link"
        >{props.children}</NavLink>
    </div>
}
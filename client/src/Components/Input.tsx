
import "../Styles/Components/Input.css"

interface Props {
    placeholder?: string;
    onChange: (arg: any) => void;
    value?: any;
    type?: string;
}

export const Input = (props: Props) => {
    return <input className="input" 
        type={props.type}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}    
        value={props.value}
    ></input>
}
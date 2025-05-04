import './inputComponent.css';

const InputComponent = ({type, id, name, minLength, maxLength, placeholder, value, onChange}: {type?: string, id?: string, name?:string, minLength?: number, maxLength?:number, placeholder?:string, value?:string, onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return (
        <input type={type} id={id} name={name} minLength={minLength} maxLength={maxLength} placeholder={placeholder} value={value} onChange={onChange}/>
    )
}

export default InputComponent

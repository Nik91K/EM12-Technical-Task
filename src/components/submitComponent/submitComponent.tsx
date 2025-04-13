import './submitComponent.css';

const SubmitComponent = ({type, onClick}: {type?: 'button' | 'submit' | 'reset', onClick?: React.MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <button type={type} className='submitButton' onClick={onClick}>Submit</button>
    )
}

export default SubmitComponent

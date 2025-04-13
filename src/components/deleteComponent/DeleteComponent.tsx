import './DeleteComponent.css'

const DeleteComponent = ({ onClick }: {onClick?: () => void}) => {
    return (
        <button className='delete-button' onClick={onClick}>X</button>
    )
}

export default DeleteComponent

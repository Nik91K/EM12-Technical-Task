import React from 'react'
import './DeleteComponent.css'

const DeleteComponent = ({ onClick, id }: {onClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void, id:number}) => {
    return (
        <button
            className='delete-button'
            onClick={(e) => onClick(e, id)}
        >
            X
        </button>
    );
};

export default DeleteComponent;

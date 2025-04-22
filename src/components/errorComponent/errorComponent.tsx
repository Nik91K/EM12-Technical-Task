import './errorComponent.css'
import React from 'react';
import { PiExclamationMarkFill } from "react-icons/pi";

type ChildrenType = {
    children: React.ReactNode,
}
const ErrorComponent = (props: ChildrenType) => {
 return (
    <>
        <div className='error-component'>
            <PiExclamationMarkFill className='error-icon'/>
            <p className='error-text'>
                { props.children }
            </p>
        </div>
    </>
 )
}

export default ErrorComponent

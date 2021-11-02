import React from 'react';

import './ErrorBox.css';

const ErrorBox = ({ errors }) => {
    return(
        <div className="ErrorBox">
            <ul>
                { errors.map((error, index) => {
                    return <li key={ index }>{ error.msg }</li>
                }) }
            </ul>
        </div>
    )
}

export default ErrorBox;
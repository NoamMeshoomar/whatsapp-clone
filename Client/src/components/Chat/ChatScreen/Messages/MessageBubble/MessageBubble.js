import React from 'react';

import './MessageBubble.css';

const MessageBubble = ({ mine, message }) => {
    return(
        <div className={ mine ? "mb my" : "mb cb" }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13">
                <path opacity="0.2" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
                <path fill={ mine ? "#dcf8c6" : "#fff" } d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
            </svg>
            <pre>{ message }</pre>
        </div>
    )
}

export default MessageBubble;
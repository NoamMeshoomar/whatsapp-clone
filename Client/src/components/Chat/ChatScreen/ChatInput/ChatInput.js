import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../../utils/SocketIOConnection';
import { sendMessage } from '../../../../actions/ChatActions';
import { updateLastMessage, updateContactsOrder } from '../../../../actions/ContactsActions';
import Axios from '../../../../utils/Axios';

import SmileyIcon from '../../../../assets/icons/happy.svg';
import LinkIcon from '../../../../assets/icons/link.svg';
import MicrophoneIcon from '../../../../assets/icons/microphone.svg';
import SendIcon from '../../../../assets/icons/send.svg';

import './ChatInput.css';

const ChatInput = () => {
    const [message, setMessage] = useState('');

    const inputRef = useRef();
    const converstionID = useSelector(state => state.chat.activeChat.converstionID);

    const dispatch = useDispatch();

    const handleSendMessage = () => {
        if(!message.length) return;

        Axios({
            method: 'POST',
            url: `/messages/new/${ converstionID }`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: { message }
        })
        .then(res => {
            socket.emit('NEW_MESSAGE', res.data.message);
            dispatch(sendMessage(res.data.message));
            dispatch(updateContactsOrder(res.data.message.converstionID));
            dispatch(updateLastMessage({ activeChat: res.data.message.converstionID, message: res.data.message.message }));
        })
        .catch(err => console.error(err));

        setMessage('');
        inputRef.current.value = '';
    }

    return(
        <form className="ChatInput">
            <div className="options">
                <img className="icon" src={ SmileyIcon } style={ { marginLeft: 20 } } width="25" alt=""/>
                <img className="icon" src={ LinkIcon } width="20" alt=""/>
            </div>
            <input type="text" placeholder="הקלד/י הודעה" ref={ inputRef } onChange={ e => setMessage(e.target.value) } />
            { message.length < 1 ? <img className="icon" src={ MicrophoneIcon } width="23" alt=""/> : <button className="send-button" onClick={ handleSendMessage }>
                <img className="icon" src={ SendIcon } width="23" alt=""/>
            </button> }
        </form>
    )
}

export default ChatInput;
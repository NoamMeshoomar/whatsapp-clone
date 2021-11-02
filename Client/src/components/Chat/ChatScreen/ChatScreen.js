import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ChatDetails from './ChatDetails/ChatDetails';
import Messages from './Messages/Messages';

import './ChatScreen.css';
import ChatInput from './ChatInput/ChatInput';

const ChatScreen = () => {
    const isLogged = useSelector(state => state.user.isLogged);
    const activeChat = useSelector(state => state.chat.activeChat);

    const history = useHistory();

    useEffect(() => {
        if(!isLogged) history.push('/signin');
    }, [history, isLogged]);

    return(
        <div className="ChatScreen">
            { activeChat && <Fragment>
                <ChatDetails />
                <Messages />
                <ChatInput />
            </Fragment> }
        </div>
    )
}

export default ChatScreen;
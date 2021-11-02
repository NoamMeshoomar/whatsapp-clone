import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateContactsOrder, updateLastMessage } from '../../actions/ContactsActions';

import socket from '../../utils/SocketIOConnection';

import SideBar from './SideBar/SideBar';
import ChatScreen from './ChatScreen/ChatScreen';

import './Chat.css';

const Chat = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('UPDATE_CONTACTS_ORDER', ({ activeChat, message }) => {
            dispatch(updateContactsOrder(activeChat));
            dispatch(updateLastMessage({ activeChat, message: message.message }));
        });
    }, [dispatch]);

    return(
        <div className="Chat">
            <SideBar />
            <ChatScreen />
        </div>
    )
}

export default Chat;
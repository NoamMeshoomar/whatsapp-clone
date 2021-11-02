import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../../utils/SocketIOConnection';
import { setChatMessages, sendMessage, loadMore, resetMessages } from '../../../../actions/ChatActions';
import { updateContactsOrder, updateLastMessage } from '../../../../actions/ContactsActions';
import Axios from '../../../../utils/Axios';

import MessageBubble from './MessageBubble/MessageBubble';

import './Messages.css';

const getChatMessages = async (converstionID, limit, skip) => {
    return await Axios({
        method: 'GET',
        url: `/messages/${ converstionID }/${ limit }/${ skip }`,
        headers: { token: localStorage.getItem('token') }
    })
    .then(res => res.data);
}

const Messages = () => {
    const [initialLoad, setInitialLoad] = useState(false);
    const [hasMore, setHasMore] = useState(null);
    const [inBottom, setInBottom] = useState(false);

    const limit = 30;
    const skip = useRef(0);

    const chatRef = useRef(null);

    const converstionID = useSelector(state => state.chat.activeChat.converstionID);
    const userID = useSelector(state => state.user.user._id);
    const messagesState = useSelector(state => state.chat.messages);

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if(!initialLoad && messagesState.length > 0) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
            setInitialLoad(true);
            setInBottom(true);
        }

        if(inBottom)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [initialLoad, messagesState, inBottom]);

    useEffect(() => {
        socket.on('NEW_MESSAGE', ({ activeChat, message }) => {
            dispatch(sendMessage(message));
            dispatch(updateContactsOrder(activeChat));
            dispatch(updateLastMessage({ activeChat, message: message.message }));

            if(chatRef.current.scrollHeight - chatRef.current.scrollTop === chatRef.current.clientHeight) 
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
        });
    }, [dispatch]);

    useEffect(() => {
        skip.current = 0;
        dispatch(resetMessages());
        setInitialLoad(false);
        setInBottom(false);
        setHasMore(null);

        const fetchMessages = async () => {
            const { messages, hasMore } = await getChatMessages(converstionID, limit, skip.current);

            skip.current += messages.length;
            dispatch(setChatMessages(messages));
            setHasMore(hasMore);
        }

        fetchMessages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [converstionID, skip]);

    const handleLoadMore = async () => {
        if(!(chatRef.current.scrollHeight - chatRef.current.scrollTop === chatRef.current.clientHeight)) {
            setInBottom(false);
        } else {
            setInBottom(true);
        }

        if(hasMore && chatRef.current.scrollTop === 0) {
            const { messages, hasMore } = await getChatMessages(converstionID, limit, messagesState.length);

            skip.current += messages.length;
            dispatch(loadMore(messages));
            setHasMore(hasMore);
            chatRef.current.scrollTop = 1000;
        }
    }

    return(
        <div className="Messages" onScroll={ handleLoadMore } ref={ chatRef }>
            { [...messagesState].reverse().map(message => {
                return <MessageBubble key={ message._id } mine={ message.userID === userID } message={ message.message } />
            }) }
        </div>
    )
}

export default Messages;
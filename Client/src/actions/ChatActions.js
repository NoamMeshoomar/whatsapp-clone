import socket from '../utils/SocketIOConnection';

export const activeChat = payload => dispatch => {
    dispatch({ type: 'ACTIVE_CHAT', payload });

    socket.emit('ACTIVE_CHAT', payload);
};

export const setChatMessages = payload => dispatch => dispatch({ type: 'SET_CHAT_MESSAGES', payload });

export const loadMore = payload => dispatch => dispatch({ type: 'LOAD_MORE', payload });

export const sendMessage = payload => dispatch => dispatch({ type: 'SEND_MESSAGE', payload });

export const resetMessages = () => {
    return {
        type: 'RESET_MESSAGES'
    }
}
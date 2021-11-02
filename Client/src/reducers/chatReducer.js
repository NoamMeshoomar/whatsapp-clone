const initialState = {
    activeChat: null,
    messages: []
}

const ChatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ACTIVE_CHAT':
            return state = { ...state, activeChat: action.payload };
        case 'SET_CHAT_MESSAGES':
            return state = { ...state, messages: action.payload };
        case 'LOAD_MORE':
            return state = { ...state, messages: [...state.messages, ...action.payload] };
        case 'SEND_MESSAGE':
            return state = { ...state, messages: [action.payload, ...state.messages] };
        case 'RESET_MESSAGES':
            return state = { ...state, messages: [] }
        default:
            return state;
    }
}

export default ChatReducer;
const initialState = {
    isLogged: false,
    user: null,
    searchContact: ''
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTHENTICATION':
            return state = { ...state, isLogged: true, user: action.payload };
        case 'LOGIN':
            return state = { ...state, isLogged: true, user: action.payload }; 
        case 'LOGOUT':
            return state = initialState;
        case 'SEARCH_CONTACT':
            return state = { ...state, searchContact: action.payload }
        default:
            return state;
    }
}

export default UserReducer;
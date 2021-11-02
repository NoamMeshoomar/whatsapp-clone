import Axios from '../utils/Axios';

export const authentication = () => dispatch => {
    if(!localStorage.getItem('token')) return;

    Axios({
        method: 'GET',
        url: '/users/current-user',
        headers: {
           token: localStorage.getItem('token')
        }
    })
    .then(res => dispatch({ type: 'AUTHENTICATION', payload: res.data.user }))
    .catch(() => localStorage.removeItem('token'));
}

export const login = payload => dispatch => {
    dispatch({ type: 'LOGIN', payload });
}

export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
}

export const searchContact = searchText => {
    return {
        type: 'SEARCH_CONTACT',
        payload: searchText
    }
}
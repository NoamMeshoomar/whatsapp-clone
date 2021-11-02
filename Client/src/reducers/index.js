import { combineReducers } from 'redux';

import UserReducer from './userReducer';
import ChatReducer from './chatReducer';
import ContactsReducer from './contactsReducer';

const allReducers = combineReducers({
    user: UserReducer,
    chat: ChatReducer,
    contacts: ContactsReducer
});

export default allReducers;
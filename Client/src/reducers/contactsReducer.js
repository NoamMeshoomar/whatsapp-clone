const intialState = {
	contacts: [],
	searchContactQuery: ''
}

const ContactsReducer = (state = intialState, action) => {
	switch(action.type) {
		case 'GET_CONTACTS':
			return state = { ...state, contacts: action.payload };
		case 'ADD_CONTACT':
			return state = { ...state, contacts: [action.payload, ...state.contacts] };
		case 'UPDATE_CONTACTS_ORDER':
			const contactToUpdate = state.contacts.find(contact => contact.converstionID === action.payload);
			const contactIndex = state.contacts.indexOf(contactToUpdate);
			state.contacts.splice(contactIndex, 1);
			return state = { ...state, contacts: [contactToUpdate, ...state.contacts] };
		case 'UPDATE_LAST_MESSAGE':
			const contactToUpdate2 = state.contacts.find(contact => contact.converstionID === action.payload.activeChat);
			const contactIndex2 = state.contacts.indexOf(contactToUpdate2);
			state.contacts[contactIndex2].lastMessage = action.payload.message;
			return state = { ...state, contacts: state.contacts };
		case 'SEARCH_CONTACT':
			return state = { ...state, searchContactQuery: action.payload }
		default:
			return state;
	}
}

export default ContactsReducer;
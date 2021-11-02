export const getContacts = contacts => {
	return {
		type: 'GET_CONTACTS',
		payload: contacts
	}
}

export const addContact = contact => {
	return {
		type: 'ADD_CONTACT',
		payload: contact
	}
}

export const updateContactsOrder = chatId => {
	return {
		type: 'UPDATE_CONTACTS_ORDER',
		payload: chatId
	}
}

export const updateLastMessage = chat => {
	return {
		type: 'UPDATE_LAST_MESSAGE',
		payload: chat
	}
}

export const searchContact = searchQuery => {
	return {
		type: 'SEARCH_CONTACT',
		payload: searchQuery
	}
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeChat } from '../../../../../actions/ChatActions';
import ServerMediaURL from '../../../../../utils/ServerMediaURL';

import './Contact.css';

const Contact = ({ contact }) => {
    const dispatch = useDispatch();

    const chat = useSelector(state => state.chat);

    return(
        <div className="Contact" style={ chat.activeChat?._id === contact._id ? { backgroundColor: '#ececec' } : null } onClick={ () => dispatch(activeChat({ 
            _id: contact._id, 
            converstionID: contact.converstionID, 
            contactUser: { image: contact.contactID.image, username: contact.contactID.username, date: contact.createdAt },
            lastMessage: contact.lastMessage
        })) }>
            <img src={ `${ ServerMediaURL }/profiles/${ contact.contactID.image }` } width="50" height="50" alt=""/>
            <div className="details">
                <h3>{ contact.contactID.username }</h3>
                <p>{ contact.lastMessage.length >= 15 ? contact.lastMessage.slice(0, 15) + '...' : contact.lastMessage }</p>
            </div>
            <p className="date">{ contact.updatedAt.slice(0, 10) }</p>
        </div>
    )
}

export default Contact;
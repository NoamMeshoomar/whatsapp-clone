import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, addContact, searchContact } from '../../../../actions/ContactsActions';

import Axios from '../../../../utils/Axios';

import Contact from './Contact/Contact';

import loadingSVG from '../../../../assets/images/loading.svg';
 
import './Contacts.css';

const Contacts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const contacts = useSelector(state => state.contacts);

    const unmounted = useRef(false);

    useEffect(() => {
        unmounted.current = true;

        Axios({
            method: 'GET',
            url: '/contacts',
            headers: { token: localStorage.getItem('token') }
        })
        .then(res => {
            if(unmounted.current) {
                dispatch(getContacts(res.data.contacts));
                setLoading(false);
            }
        })
        .catch(err => console.error(err));

        return () => unmounted.current = false;
    }, [dispatch]);

    const handleAddContact = () => {
        Axios({
            method: 'POST',
            url: '/contacts/add',
            headers: { token: localStorage.getItem('token') },
            data: { newContactEmail: contacts.searchContactQuery }
        })
        .then(res => {
            dispatch(searchContact(''));
            dispatch(addContact(res.data.contact));
        })
        .catch(err => setError(err.response.data.message));
    }

    return(
        <div className="Contacts">
            <div className="contacts-container">
                { loading ? <div className="loading-container">
                    <img className="loading" src={ loadingSVG } width="100" alt="" />
                </div> : <Fragment>
                    { contacts.contacts.length > 0 && !contacts.searchContactQuery.length > 0 ? <Fragment>
                        { contacts.contacts.map(contact => {
                            return <Contact key={ contact._id } contact={ contact } />
                        }) }
                    </Fragment> : <div className="add-contact">
                        <button style={ { textAlign: 'center' } } onClick={ handleAddContact }>הוסף איש קשר</button>
                        <h3>{ error && error }</h3>
                    </div> }
                </Fragment> }
            </div>
        </div>
    )
}

export default Contacts;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchContact } from '../../../../actions/ContactsActions';

import SearchIcon from '../../../../assets/icons/search.svg';

import './SearchBar.css';

const SearchBar = () => {
    const dispatch = useDispatch();

    const searchContactText = useSelector(state => state.contacts.searchContactQuery);

    const handleSearch = async e => {
        e.preventDefault();

        dispatch(searchContact(e.target.value));
    }

    return(
        <div className="SearchBar">
            <form>
                <img src={ SearchIcon } width="14" alt=""/>
                <input type="text" className="search-contacts" value={ searchContactText } placeholder="חפש/י או התחל/י צ'אט חדש" onChange={ handleSearch } />
            </form>
        </div>
    )
}

export default SearchBar;
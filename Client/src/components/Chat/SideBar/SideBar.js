import React from 'react';

import UserBar from './UserBar/UserBar';
import SearchBar from './SearchBar/SearchBar';
import Contacts from './Contacts/Contacts';

import './SideBar.css';

const SideBar = () => {
    return(
        <div className="SideBar">
            <UserBar />
            <SearchBar />
            <Contacts />
        </div>
    )
}

export default SideBar;
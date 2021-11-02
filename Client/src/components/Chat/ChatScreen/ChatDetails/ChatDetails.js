import React from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import ServerMediaURL from '../../../../utils/ServerMediaURL';

import MenuIcon from '../../../../assets/icons/menu.svg';
import SearchIcon from '../../../../assets/icons/search.svg';

import './ChatDetails.css';

const ChatDetails = () => {
    const activeChat = useSelector(state => state.chat.activeChat);

    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

    return(
        <div className="ChatDetails">
            <div className="contact-information">
                <animated.img src={ `${ ServerMediaURL }/profiles/${ activeChat.contactUser.image }` } style={ springProps } width="40" height="40" alt="" />
                <div className="contact-details">
                    <h3>{ activeChat.contactUser.username }</h3>
                    <p>נוצר ב- { activeChat.contactUser.date?.slice(0, 10) }</p>
                </div>
            </div>
            <div className="options">
                <img className="icon" src={ SearchIcon } width="18" alt=""/>
                <img className="icon" src={ MenuIcon } width="18" alt=""/>
            </div>
        </div>
    )
}

export default ChatDetails;
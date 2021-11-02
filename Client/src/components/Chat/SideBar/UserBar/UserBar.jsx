import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../../utils/Axios';

import ServerMediaURL from '../../../../utils/ServerMediaURL';

import StatusImage from '../../../../assets/icons/charging-circle.svg';
import ChattingImage from '../../../../assets/icons/chatting.svg';
import MenuImage from '../../../../assets/icons/menu.svg';

import './UserBar.css';

const UserBar = () => {
    const [changeImageOpen, setChangeImageOpen] = useState(false);
    const [picture, setPicture] = useState(null);

    const userImage = useSelector(state => state.user.user?.image);

    const userPictureRef = useRef(null);

    const handleUploadImage = e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('picture', picture);

        axios.post('/users/picture', fd, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(res => {
            if(res) {
                handleImageFromInput();
                setChangeImageOpen(false);
            }
        })
        .catch(err => console.error(err.response));
    }
    
    const handleImageFromInput = () => {
        const reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onloadend = () => userPictureRef.current.src = reader.result;
    }

    return(
        <div className="UserBar">
            <img 
                src={ userImage && `${ ServerMediaURL }/profiles/${ userImage }` } 
                style={ { borderRadius: 100, cursor: 'pointer' } } 
                width="40" 
                height="40" 
                alt=""
                onClick={ () => setChangeImageOpen(true) }
                ref={ userPictureRef }
            />
            { changeImageOpen && <form className="image_form" onSubmit={ handleUploadImage } encType="multipart/form-data">
                <span className="close_btn" onClick={ () => setChangeImageOpen(false) }>x</span>
                <input type="file" onChange={ e => setPicture(e.target.files[0]) } />
                <button className="classic-button" type="submit">העלה תמונה</button>
            </form> }
            <div className="options">
                <img className="icon" src={ StatusImage } width="20" alt=""/>
                <img className="icon" src={ ChattingImage } width="22" alt=""/>
                <img className="icon" src={ MenuImage } width="18" alt=""/>
            </div>
        </div>
    )
}

export default UserBar;
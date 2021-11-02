import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import Axios from '../../utils/Axios';

import ErrorBox from '../ErrorBox/ErrorBox';

import loadingSVG from '../../assets/images/loading.svg';

import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(null);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const isLogged = useSelector(state => state.user.isLogged);

    useEffect(() => {
        if(isLogged) return history.push('/');
    }, [isLogged, history]);

    const handleRegister = e => {
        e.preventDefault();

        setLoading(true);

        Axios({
            method: 'POST',
            url: '/users/register',
            data: {
                username,
                email,
                password,
                confirmPassword
            }
        })
        .then(res => {
            setLoading(false);
            localStorage.setItem('token', res.data.token);
            history.push('/');
        })
        .catch(err => {
            setErrors(err.response.data.errors);
            setLoading(false);
        });
    }

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: -5, transform: 'translateY(250px)' } });

    return(
        <animated.div style={ springProps } className="Register">
            <form onSubmit={ handleRegister }>
                <input className="classic-input" type="text" placeholder="שם משתמש" autoFocus onChange={ e => setUsername(e.target.value) } />
                <input className="classic-input" type="email" placeholder="אימייל" onChange={ e => setEmail(e.target.value) } />
                <input className="classic-input" type="password" placeholder="סיסמא" onChange={ e => setPassword(e.target.value) } />
                <input className="classic-input" type="password" placeholder="הקלד סיסמא שנית" onChange={ e => setConfirmPassword(e.target.value) } />
                <button className="classic-button" type="submit">הרשם { loading && <img className="loading" style={ { marginRight: 10 } } src={ loadingSVG } width="30" alt="" /> }</button>
            </form>
            <h3>כבר רשום? <Link to="/signin">התחבר</Link></h3>
            { errors.length > 0 && <ErrorBox errors={ errors } /> }
        </animated.div>
    )
}

export default Register;
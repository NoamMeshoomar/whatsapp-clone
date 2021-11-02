import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { login, logout } from '../../actions/UserActions';
import Axios from '../../utils/Axios';

import ErrorBox from '../ErrorBox/ErrorBox';

import loadingSVG from '../../assets/images/loading.svg';

import './Login.css';
import { Fragment } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(null);
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const isLogged = useSelector(state => state.user.isLogged);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isLogged) return history.push('/');
    }, [isLogged, history]);

    const handleLogin = e => {
        e.preventDefault();

        setLoading(true);

        Axios({
            method: 'post',
            url: '/users/login',
            data: {
                email,
                password
            }
        })
        .then(res => {
            setLoading(false);
            localStorage.setItem('token', res.data.token);
            dispatch(login(res.data.user));
            history.push('/');
        })
        .catch(err => {
            setErrors(err.response.data.errors);
            dispatch(logout());
            setLoading(false);
        });
    }

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: -5, transform: 'translateY(250px)' } });
    
    return(
        <Fragment>
            { !isLogged && <animated.div style={ springProps } className="Login">
                <form onSubmit={ handleLogin }>
                    <input className="classic-input" type="email" placeholder="אימייל" autoFocus onChange={ e => setEmail(e.target.value) } />
                    <input className="classic-input" type="password" placeholder="סיסמא" onChange={ e => setPassword(e.target.value) } />
                    <button className="classic-button" type="submit">הכנס { loading && <img className="loading" style={ { marginRight: 10 } } src={ loadingSVG } width="30" alt="" /> }</button>
                </form>
                <h3>עוד לא רשום? <Link to="/signup">הרשם</Link></h3>
                { errors.length > 0 && <ErrorBox errors={ errors } /> }
            </animated.div> }
        </Fragment>
    )
}

export default Login;
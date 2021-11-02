import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import Chat from '../Chat/Chat';
import Login from '../Login/Login';
import Register from '../Register/Register';

import './Routes.css';

const Routes = () => {
    const springProps = useSpring({ transform: 'scale(1)', from: { transform: 'scale(1.2)' } });

    return(
        <animated.div className="Main" style={ springProps }>
            <Switch>
                <Route path="/" exact component={ Chat } />
                <Route path="/signin" exact component={ Login } />
                <Route path="/signup" exact component={ Register } />
            </Switch>
        </animated.div>
    )
}

export default Routes;
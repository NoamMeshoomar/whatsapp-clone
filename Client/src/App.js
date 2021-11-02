import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authentication } from './actions/UserActions';

import Routes from './components/Routes/Routes';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authentication());
  }, [dispatch]);

  return(
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
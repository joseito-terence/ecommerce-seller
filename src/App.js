import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { auth } from './firebase';

import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import PasswordReset from './Components/PasswordReset';
import Header from './Components/Header';
import Products from './Components/Products';
import User from './Components/User';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setUser(authUser ? authUser : null);
    })
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Switch>
            <Route path='/signup' component={SignUp} />
            <Route path='/passwordreset' component={PasswordReset}/>
            <Route path={['/signin', '/']} component={SignIn} />
          </Switch>
        ) : (
        <>
          <Header />
          <Switch>
            <Route path='/user' component={User} />
            {/* <Route path='/products' component={Products} /> */}
            <Route path='/' component={Products} />
          </Switch>
        </>
        )}
      </Router>
    </div>
  )
}

export default App;

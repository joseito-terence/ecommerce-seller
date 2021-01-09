import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;

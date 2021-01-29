import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import Product from './Components/Products';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/'>
            <Header />
            <Product />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

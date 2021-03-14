import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignIn.css";
import { auth } from '../../firebase';

function SignIn() {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.id]: target.value });
  };

  // console.log(state);

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        history.push('/');  // Redirect to root on submit.
        console.log('SignIn Successful');
      })
      .catch(error => setError(error?.message));
  }

  return (
    <div className="signIn">
      <div className="container">
        <div className="row">
          <div className="col">
            {error && 
              <div className="alert alert-danger alert-dismissible fade show m-3" role="alert">
                {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            }
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="signIn__form">
              <h2>Sign In</h2>
              <form onSubmit={signIn}>
                <label htmlFor="email" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleChange}
                  value={state.email}
                  required
                />

                <label htmlFor="password" className="form-label mt-1">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                  value={state.password}
                  required
                />
                
                <input
                  type="submit"
                  className="btn btn-primary mt-2"
                  value="Sign in"
                  />

                  <br/>
                
                {/*
                <Link to="/passwordreset" className="btn btn-link mt-2">
                  Forgot password?
                </Link>
                */}

                <Link to="/signup" className="btn btn-link mt-2">
                  Not a member? Create an account here.
                </Link>
              </form>
            </div>
          </div>
          <div className="col">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/tybca-project.appspot.com/o/assets%2FScreenshot%202021-01-27%20122352.jpg?alt=media&token=5d70f4f2-4efe-480f-8461-a4291960a1b6"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

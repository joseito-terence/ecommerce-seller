import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import { auth } from '../../firebase';

function SignIn() {
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
      .then(() => console.log('SignIn Successful'))
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

                <Link to="/signup" className="btn btn-link mt-2">
                  Not a member? Create an account here.
                </Link>
              </form>
            </div>
          </div>
          <div className="col">
            <img
              // a random image taken from the internet
              // should be replaced later.
              src="https://firebasestorage.googleapis.com/v0/b/tybca-project.appspot.com/o/Thu%20Jan%2028%202021%2011%3A30%3A05%20GMT%2B0530%20(India%20Standard%20Time)%20-%20Screenshot%202021-01-27%20122352.jpg?alt=media&token=eced6542-1259-47c2-af2b-fd71e90a6eff"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

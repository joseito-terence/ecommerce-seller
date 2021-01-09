import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.id]: target.value });
  };

  // console.log(state);

  return (
    <div className="signIn">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="signIn__form">
              <h2>Sign In</h2>
              <form>
                <label htmlFor="email" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleChange}
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
              src="https://content.webengage.com/wp-content/uploads/sites/4/2018/09/5-Ways-to-Get-Engage-Sellers.png"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PasswordReset.css";
import { auth } from '../../firebase';

function PasswordReset() {

  const initialState = {
    email: "",
    
  };

  const [state, setState] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };


  const submit = (event) => {
    event.preventDefault();

    // logic for submit goes here...
  };

  return (
    <div className="PasswordReset">
      <form onSubmit={submit} method="post">
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <h2>Reset Password</h2>
              <hr/>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="text-end fs-5" htmlFor="email">
                Email:
              </label>

              <input
                type="text"
                name="email"
                className="form-control"
                value={state.email}
                onChange={handleChange}
                required
                />
            </div>

          </div>
          <div className="row">
            <div className="col">
              <label className="text-end fs-5" htmlFor="opt">
                OPT:
              </label>

              <input
                type="text"
                name="opt"
                className="form-control"
                value={state.opt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col ">
              <button className="btn btn-primary mt-4">
                Send OTP
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col">
            <label className="text-end fs-5" htmlFor="npass">
                New Password
              </label>

              <input
                type="text"
                name="npass"
                className="form-control"
                value={state.npass}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="cpass">
               Confirm Password
             </label>

              <input
                type="text"
                name="cpass"
                className="form-control"
                value={state.cpass}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center ">
              <button type="submit" className="btn btn-primary mt-3" >Reset Password</button>
              </div>
            </div>

            <div className="row ">
              <div className="col d-flex justify-content-center">
              <Link to="/" className="btn btn-link mt-3 ">
                  Back to login
                </Link>
              </div>
              <div className="col d-flex justify-content-center">
              <Link to="/signup" className="btn btn-link mt-3">
              Not a member? Create an account here.
                </Link>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;

import React from "react";

function Stage1({ currentStep, state, handleChange }) {
  return currentStep !== 1 ? null : (
    <div id="stage1 container">
      <div className="row">
        <div className="col">
          <h3 className="mb-3">Account Information</h3>
        </div>
      </div>

      <div className="row g-2">
        <div className="col">
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="fname"
              placeholder="First Name"
              onChange={handleChange}
              value={state.fname}
              required
            />

            <label htmlFor="fname">First Name</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="lname"
              placeholder="Last Name"
              onChange={handleChange}
              value={state.lname}
              required
            />

            <label htmlFor="lname">Last Name</label>
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col">
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone No."
              onChange={handleChange}
              value={state.phone}
              required
            />

            <label htmlFor="phone">Phone No.</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={state.email}
              required
            />

            <label htmlFor="email">Email</label>
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col">
          <div className="form-floating mb-1">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={state.password}
              required
            />

            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-1">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={state.confirmPassword}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage1;

import React from "react";

function Stage2({ currentStep, state, handleChange }) {
  return currentStep !== 2 ? null : (
    <div id="stage2 container">
      <div className="row">
        <div className="col">
          <h3 className="mb-3">Business Information</h3>
        </div>
      </div>

      <div className="row g-2">
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="storeName"
              placeholder="Store Name"
              onChange={handleChange}
              value={state.storeName}
              required
            />


            <label htmlFor="storeName">Store Name</label>
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col">
          <h5 className="mt-2">Business Address</h5>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="shopNo"
              placeholder="Shop No."
              onChange={handleChange}
              value={state.shopNo}
              required
            />

            <label htmlFor="shopNo">Shop No.</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="pincode"
              pattern="^[\d]{6}$"
              placeholder="Pincode"
              title="Pincode has to be 6 digits"
              onChange={handleChange}
              value={state.pincode}
              required
            />

            <label htmlFor="pincode">Pincode</label>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              onChange={handleChange}
              value={state.city}
              required
            />

            <label htmlFor="city">City</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="State"
              onChange={handleChange}
              value={state.state}
              required
            />

            <label htmlFor="state">State</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Country"
              onChange={handleChange}
              value={state.country}
              required
            />

            <label htmlFor="country">Country</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage2;

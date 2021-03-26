import React from "react";

function Stage3({ currentStep, state, handleChange }) {
  /*
  const tenYears = () => {
    const currYear = new Date().getFullYear();
    const list = [];
    for (let year = currYear; year <= currYear + 10; year++) {
      list.push(year);
    }
    return list;
  };
  */

  return currentStep !== 3 ? null : (
    <div id="stage3 container">
      <div className="row">
        <div className="col">
          <h3 className="mb-3">Billing Information</h3>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="accHoldersName"
              placeholder="Account Holder's Name"
              onChange={handleChange}
              value={state.accHoldersName}
              required
              />

            <label htmlFor="accHoldersName">Account Holder's Name</label>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-4">
          <div className="form-floating">

            {/* <input 
              type="number"
              className="form-control"
              id="cardNumber"
              placeholder="Card Number"
              minLength={13}
              maxLength={19}
              onChange={handleChange}
              value={state.cardNumber}
              //Visa || Mastercard
              //pattern="/^(?:4[0-9]{12}(?:[0-9]{3})?)$/ | /^(?:5[1-5][0-9]{14})$/ "
              required
            />*/}
            <input 
              type="text"
              className="form-control"
              id="branchIFSC"
              placeholder="Branch IFSC Code"
              pattern="^[A-Za-z]{4}[a-zA-Z0-9]{7}$"
              title="Example: AAAA0999999, XXXX099XX9XX"
              onChange={handleChange}
              value={state.branchIFSC}
            />

            <label htmlFor="branchIFSC">Branch IFSC Code</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">

            <input
              type="text"
              className="form-control"
              id="accNumber"
              placeholder="Account Number"
              minLength={8}
              maxLength={18}
              title="Usually 8-18 digits"
              onChange={handleChange}
              value={state.accNumber}
              required
            />

            <label htmlFor="accNumber">Account Number</label>
          </div>
        </div>
      </div>

{/*  
      <div className="row mb-2">
        <div className="col-3">
          <h5>Expiry Date</h5>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-3">
          <div className="form-floating">
            <select
              className="form-select"
              id="month"
              onChange={handleChange}
              value={state.month}
              required
            >
              <option value=""> --Select-- </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <label htmlFor="month">Month</label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <select
              className="form-select"
              id="year"
              onChange={handleChange}
              value={state.year}
              required
            >
              <option value=""> --Select-- </option>
              {tenYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <label htmlFor="month">Year</label>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}

export default Stage3;

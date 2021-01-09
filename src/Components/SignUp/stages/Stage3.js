import React from 'react';

function Stage3({ currentStep, state, handleChange }) {
  return (
    currentStep !== 3 ?
    null :
    <div id="stage3 container">
      <div className="row">
        <div className="col">
          <h3 className="mb-3">Billing Information</h3>
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col">
          <div className="form-floating">
            <input type="text" className="form-control" id="cardHoldersName" placeholder="Card Holder Name" onChange={handleChange} value={state.cardHoldersName} required />
            <label htmlFor="cardHoldersName">Card Holder's Name</label>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col">
          <div className="form-floating">
            <input type="text" className="form-control" id="cardNumber" placeholder="Card Number" onChange={handleChange} value={state.cardNumber} required />
            <label htmlFor="cardNumber">Card Number</label>
          </div>
        </div>
        <div className="col-2">
          <div className="form-floating">
            <input type="number" className="form-control" id="cvv" placeholder="CVV" maxLength="3" onChange={handleChange} value={state.ccv} required />
            <label htmlFor="cvv">CVV</label>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-3">
          <h5>Expiry Date</h5>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-3">
          <div className="form-floating">
            <select className="form-select" id="month">
              <option> --Select-- </option>
              <option>Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <label htmlFor="month">Month</label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
          <select className="form-select" id="year">
              <option> --Select-- </option>
              <option>2024</option>
              <option>2025</option>
            </select>
            <label htmlFor="month">Year</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stage3;

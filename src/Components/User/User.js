import React, { useState, useRef, useEffect } from "react";
import "./User.css";
import db, { auth } from "../../firebase";

function UserUpdate() {
  const tenYears = () => {
    const currYear = new Date().getFullYear();
    const list = [];
    for (let year = currYear; year <= currYear + 10; year++) {
      list.push(year);
    }
    return list;
  };

  const initialState = {
    fname: "",
    lname: "",
    phone: "",
    email: "",

    storeName: "",
    shopNo: "",
    pincode: "",
    city: "",
    state: "",
    country: "",

    cardHoldersName: "",
    cardNumber: "",
    cvv: "",
    month: "",
    year: "",
  };

  const [state, setState] = useState(initialState);
  const [originalInfo, setOriginalInfo] = useState({}); // stores the original user information to revert back onCancel.
  const [isDisabled, setIsDisabled] = useState(true);
  const { uid, displayName } = auth.currentUser;

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const resetForm = () => {
		setIsDisabled(true);
		setState(originalInfo);
  };

  const submit = (event) => {
    event.preventDefault();

    // logic for submit goes here...
  };

  useEffect(() => {
    db.doc(`sellers/${uid}`)
      .get()
      .then(doc => setState({
        fname: displayName.split(' ')[0],
        lname: displayName.split(' ')[1],
        ...doc.data(),                 // spread the full object.   
        ...doc.data().billingInfo,     
        ...doc.data().businessInfo
      }))
      .catch(err => console.log(err));
  }, []);

  console.log(state);
  
  return (
    <div className="UpdateUser">
      <form onSubmit={submit} method="post">
        <div className="container mt-4">
          {/* Account */}
          <div className="row my-2">
            <div className="col">
              <h3 className="border-bottom p-2">Account</h3>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="text-end fs-5" htmlFor="fname">
                First Name
              </label>

              <input
                type="text"
                name="fname"
                className="form-control"
                value={state.fname}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="lname">
                Last Name
              </label>

              <input
                type="text"
                name="lname"
                className="form-control"
                value={state.lname}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <label className="text-end fs-5" htmlFor="phone">
                Phone No.
              </label>

              <input
                type="text"
                name="phone"
                className="form-control"
                value={state.phone}
                onChange={handleChange}
                disabled={isDisabled}
                required
                pattern="^\d+$"
                title="Only Numbers allowed."
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="fname">
                Email
              </label>

              <input
                type="text"
                name="email"
                className="form-control"
                value={state.email}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-link p-1">
                Change Password
              </button>
            </div>
          </div>

          {/* Business Information */}
          <div className="row my-2">
            <div className="col">
              <h3 className="border-bottom p-2">Business Info </h3>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <label className="text-end fs-5" htmlFor="storeName">
                Store Name
              </label>

              <input
                type="text"
                name="storeName"
                className="form-control"
                value={state.storeName}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="shopNo">
                Shop Number
              </label>

              <input
                type="text"
                name="shopNo"
                className="form-control"
                value={state.shopNo}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <label className="text-end fs-5" htmlFor="pincode">
                Pincode
              </label>

              <input
                type="number"
                name="pincode"
                className="form-control"
                value={state.pincode}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="city">
                City
              </label>

              <input
                type="text"
                name="city"
                className="form-control"
                value={state.city}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="text-end fs-5" htmlFor="state">
                State
              </label>

              <input
                type="text"
                name="state"
                className="form-control"
                value={state.state}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="city">
                Country
              </label>

              <input
                type="text"
                name="country"
                className="form-control"
                value={state.country}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>

          {/* Billing Information */}
          <div className="row my-2">
            <div className="col">
              <h3 className="border-bottom p-2">Billing Info.</h3>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="text-end fs-5" htmlFor="cardHoldersName">
                Card Holders Name
              </label>

              <input
                type="text"
                name="cardHoldersName"
                className="form-control"
                value={state.cardHoldersName}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="text-end fs-5" htmlFor="cardNumber">
                Card Number
              </label>

              <input
                type="text"
                name="cardNumber"
                className="form-control"
                value={state.cardNumber}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="cvv">
                CVV
              </label>

              <input
                type="text"
                name="state"
                className="form-control"
                value={state.cvv}
                onChange={handleChange}
                disabled={isDisabled}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <h5>Expiry Date</h5>
            <div className="col">
              <label className="text-end fs-5" htmlFor="Month">
                Month
              </label>

              <select
                className="form-select"
                id="month"
                onChange={handleChange}
                value={state.month}
                disabled={isDisabled}
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
            </div>

            <div className="col">
              <label className="text-end fs-5" htmlFor="city">
                Year
              </label>

              <select
                className="form-select"
                id="year"
                onChange={handleChange}
                value={state.year}
                disabled={isDisabled}
                required
              >
                <option value=""> --Select-- </option>
                {tenYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col d-flex justify-content-center">
              {isDisabled ? (
                <button type='button' className="btn btn-outline-primary btn-lg mx-2" onClick={() => setIsDisabled(false)}>
                  <i className="fas fa-edit me-1"></i>
                  Edit
                </button>
              ) : (
                <>
                  <button type='button' className="btn btn-secondary btn-lg mx-2" onClick={resetForm}>
                    <i className="far fa-times-circle me-1"></i>
                    Cancel
                  </button>
                  <button type='submit' className="btn btn-success btn-lg mx-2">
                    <i className="far fa-check-circle me-1"></i>
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserUpdate;

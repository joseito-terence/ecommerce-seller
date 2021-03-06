import React, { useState, useRef } from "react";
import "./User.css"
import db, { auth, storage } from '../../firebase';

function UserUpdate(){
    const initialState = {
        fname: '', 
        lname: '', 
        phone: '', 
        email: '', 
    
        storeName: '',
        shopNo: '',
        pincode: '',
        city: '', 
        state: '', 
        country: '', 
    
        cardHoldersName: '', 
        cardNumber: '',
        cvv: '',
        month: '', 
        year: '',
    };

    const [state, setState ] = useState(initialState);
    const [originalInfo, setOriginalInfo] = useState({}); // stores the original user information to revert back onCancel.
    const [isDisabled, setIsDisabled] = useState(false);
    const uid = auth.currentUser.uid;
    
    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
      }
    //reset and submit needs to be created
    const reset = () => {
        // reset function...
    }
    
    const submit = event => {
        event.preventDefault();

        // logic for submit goes here...
    }

    return(
        <div className="UpdateUser">
            <form onSubmit={submit} method='post'>

                <div className="container" >
                    {/* Account */}
                    <div className="row mb-3">
                        <h3>Account</h3>
                        <hr/>
                        <div className="col">
                            <label className="text-end fs-5" htmlFor="fname">First Name</label>
                            <input type="text" name='fname' className='form-control' value={state.fname} onChange={handleChange} disabled={isDisabled} required/>
                        </div>
                    
                        <div className="col">
                            <label className="text-end fs-5" htmlFor="lname">Last Name</label>
                            <input type="text" name='lname' className='form-control' value={state.lname} onChange={handleChange} disabled={isDisabled} required/>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="text-end fs-5" htmlFor="phone">Phone No.</label>
                            <input type="text" name='phone' className='form-control' value={state.phone} onChange={handleChange} disabled={isDisabled} required
                            pattern='^\d+$' title='Only Numbers allowed.' />
                        </div>
                        <div className="col">
                            <label className="text-end fs-5" htmlFor="fname">Email</label>
                            <input type="text" name='email' className='form-control' value={state.email} onChange={handleChange} disabled={isDisabled} required/>
                        </div>
                    </div>

                    {/* Business Information */}
                    <h4>Business Info </h4>
                    <hr />
                    <div className="row mb-3">
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>
                {/* Billing Information */}
                    <div className="row">
                        <div className="col">
                        <h4>Billing Info </h4>
                        <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>
                </div>

                <div className="mb-3">

                </div>

            </form>
        </div>

    )
}


export default UserUpdate;

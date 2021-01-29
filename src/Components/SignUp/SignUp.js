import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

import Stage1 from './stages/Stage1';
import Stage2 from './stages/Stage2';
import Stage3 from './stages/Stage3';
import Stage4 from './stages/Stage4';

function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState({
    fname: '', 
    lname: '', 
    phone: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 

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
  });
  const progressBar = useRef();


  const toggleActiveClass = (liIndex) => {
    progressBar.current
      .querySelectorAll('li')[liIndex]
      .classList.toggle('active');
  }



  // Backward navigation
  const prev = (event) => {
    event.preventDefault();
    let temp_step = currentStep - 1;
    
    setCurrentStep(temp_step);

    if (temp_step > 0)
      toggleActiveClass(temp_step);
  }

  // Forward navigation 
  const next = (event) => {
    event.preventDefault();

    let temp_step = currentStep + 1;
    setCurrentStep(temp_step);

    if (temp_step < 5)
      toggleActiveClass(currentStep);

    if (temp_step === 4) {// submit to db and create account
      console.log(state);
    }
  }

  const handleChange = ({ target }) => {
    setState({ ...state, [target.id]: target.value })
  }

  return (
    <div className="signUp">

      <div className="signUp__form">
        <div className="signUp__header p-4">
          <h1>Sign Up</h1>
          <h5 className='text-muted'>Fill all form fields to go to next step.</h5>
        </div>
        

        <ul id="signUp__progressbar" ref={progressBar}>
          <li className="active" id="account">
            <strong>Account</strong>
          </li>
          <li id="business"><strong>Business</strong></li>
          <li id="billing"><strong>Billing</strong></li>
          <li id="confirm"><strong>Finish</strong></li>
        </ul>

        <form onSubmit={next}>
          <div className="signUp__stages">
            <Stage1 currentStep={currentStep} state={state} handleChange={handleChange} />
            <Stage2 currentStep={currentStep} state={state} handleChange={handleChange} />
            <Stage3 currentStep={currentStep} state={state} handleChange={handleChange} />
            <Stage4 currentStep={currentStep} />
          </div>
          
          <div className="signUp__actions">
            <button 
              className={`signUp__prevBtn btn btn-secondary ${(!(currentStep > 1) || (currentStep === 4)) && 'd-none' }`}
              onClick={prev}
            >
              Previous
            </button>
            <button 
              type='submit'
              className={`
                btn mx-2
                ${currentStep === 4 && 'd-none' } 
                ${currentStep === 3 ? 'btn-success' : 'signUp__nextBtn'}
              `} 
            >
              {currentStep === 3 ? 'Finish' : 'Next'}
            </button>
            <br />
            <Link to='/signin' className="btn btn-link">
              Already a member? Click here to sign in.
            </Link>
          </div>
        </form>
        
      </div>

    </div>
  )
}

export default SignUp;

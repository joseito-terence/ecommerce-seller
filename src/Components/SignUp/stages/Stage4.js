import React from 'react';

function Stage4({ currentStep, error }) {
  return (
    currentStep !== 4 ?
    null : 
      !error ? (
        <div id="stage4" className="text-center">
          <h2>Success !</h2>
          <i className="fas fa-check-circle text-success my-5" style={{ fontSize: '80px' }}></i>

          <h4 className="text-muted">You Have Successfully <br /> Signed Up</h4>
        </div>
      ) : (
        <div id="stage4" className="text-center">
          <h2>Failure !</h2>
          <i className="fas fa-times-circle text-danger my-5" style={{ fontSize: '80px' }}></i>

          <h4 className="text-muted">Registration Failed</h4>
        </div>
      )
    
  )
}

export default Stage4;

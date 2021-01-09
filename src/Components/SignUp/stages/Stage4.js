import React from 'react';

function Stage4({ currentStep }) {
  return (
    currentStep !== 4 ?
    null :
    <div id="stage4" className="text-center">
      <h2>Success !</h2>
      <i className="fas fa-check-circle text-success my-5" style={{fontSize: '80px'}}></i>

      <h4 className="text-muted">You Have Successfully <br /> Signed Up</h4>
    </div>
  )
}

export default Stage4;

import React from 'react';
import './SignIn.css';

function SignIn() {
  return (
    <div className='SignIn'>
      <h2>Sign In</h2>
      <form>

        <label for="email" className="form-label">Email address:</label>
        <input type="email" className="form-control" id="email" />

        <label for="password" className="form-label">Password:</label>
        <input type="password" className="form-control" id="password" />

        <input type="submit" className="btn btn-primary mt-2" value="Sign in" />

      </form>
    </div>
  )
}

export default SignIn;

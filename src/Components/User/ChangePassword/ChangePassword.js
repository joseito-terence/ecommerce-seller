import React, { useState } from "react";
import firebase from 'firebase';
import './ChangePassword.css';

function ChangePassword() {
  const initialState = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.id]: target.value });
  };

  const cancel = () => {
    setState(initialState);
  }

  const changePassword = event => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = state;

    if(!currentPassword || !newPassword || !confirmNewPassword){
      setError('All Fields Required');
    }else{
      if(newPassword === confirmNewPassword){
        console.log(state);
        const user = firebase.auth().currentUser;
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        
        user.reauthenticateWithCredential(credentials)                                    // authenticate user
          .then(() => {                                                                   // if success
            // update password here...                                                    // update password        
            user.updatePassword(newPassword)
              .then(() => {
                document.querySelector('#changePasswordModal .btn-close').click();
                setState(initialState);
              })
              .catch(err => console.log(err));
          })
          .catch(err => setError('Check current Password!'));
      }else{
        setError('New Password did not match!');
      }
    }
  }

  return (
    <div className='changePassword p-3'>
      {error && 
        <div className="alert alert-danger alert-dismissible fade show p-1" role="alert">
          {error}
          <button type="button" className="btn-close p-2" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }


      <div className="form-group">
        <label className='form-label' htmlFor="currentPassword">
          Current Password
        </label>

        <input
          type="password" id="currentPassword" className="form-control mb-3"
          value={state.currentPassword} onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label className='form-label' htmlFor="currentPassword">
          New Password
        </label>

        <input
          type="password" id="newPassword" className="form-control mb-3"
          value={state.newPassword} onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className='form-label' htmlFor="currentPassword">
          Confirm New Password
        </label>

        <input 
          type="password" id="confirmNewPassword" className="form-control mb-3"
          value={state.confirmNewPassword} onChange={handleChange}
        />
      </div>
      

      <div className="d-flex justify-content-center">
        <input type="button" value="Update" className="btn btn-success me-1" onClick={changePassword} />
        <input 
          type="button" value="Cancel" className="btn btn-danger" 
          onClick={cancel} data-bs-dismiss="modal" aria-label='Close'
        />
      </div>
    </div>
  )
}
export default ChangePassword;
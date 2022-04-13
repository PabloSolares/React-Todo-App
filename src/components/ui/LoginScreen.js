import React from "react";
import { useForm } from './../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword } from "../../actions/auth";
import { Link } from "react-router-dom";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })

  const {email, password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword(email, password));
  }


  return (
    <>
      <div className="container-auth">
        <h1>Sign In to your account</h1>
        <div className="form-box">
          <form className="form-auth" onSubmit={handleLogin}>
            <div>
                <label>Email Address</label>
                <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Enter your email address..."
                />
            </div> 
            <div>
            <label>Password</label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter your password..."
              />
            </div> 

            <button className="submit-button" type="submit">Sign In</button>
          </form>
        </div>
      </div>
      <div className="register-link">
        <span>New user? <Link className="link-auth" to="/auth/register">Create an account</Link> </span>
      </div>
    </>
  );
};

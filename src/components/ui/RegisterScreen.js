import React from "react";
import { useForm } from './../../hooks/useForm';
import { useDispatch } from 'react-redux';
import {startRegisterWithEmailPasswordName} from '../../actions/auth'
// import { login } from "../../actions/auth";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange ] = useForm({
    name: "",
    username: "",
    email: "",
    p1: "",
    p2: ""
  })

  const {name, username, email, p1, p2} = formValues

  const handleRegister = (e) => {
    e.preventDefault();
    if(isFormValid){
      dispatch(startRegisterWithEmailPasswordName(email, p1, username));
    }
    // console.log(name, username, email, p1, p2)
  }

  const isFormValid = () => {

    if( name.trim().length === 0) {
        Swal.fire('Error', 'Name is required', 'error')
        return false
    } else if( email.trim().length === 0 ) {
        Swal.fire('Error', 'Email Not Valid', 'error')
        return false
    } else if( p1 !== p2  || p1.length < 5) {
        Swal.fire('Error', 'Password is not valid', 'error')
        return false
    } else if (username.trim.length === 0 ){
      Swal.fire('Error', 'Name is required', 'error')
      return false
    }
    return true
  }

  return (
    <div className="container-auth register">
      <h1>Register your account</h1>
      <div className="form-box">
        <form className="form-auth" onSubmit={handleRegister}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Enter your full name..."
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Enter a username..."
            />
          </div>
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
              value={p1}
              onChange={handleInputChange}
              name="p1"
              placeholder="Enter your password..."
            />
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              autoComplete="off"
              value={p2}
              onChange={handleInputChange}
              name="p2"
              placeholder="Enter your password..."
            />
          </div>

          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
        <span>Already  have an account? <Link className="link-auth" to="/auth/login">Sign In</Link></span>
      </div>
    </div>
  );
};

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './Store';

function SignUp() {
  let { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let myFunc = (data) => {
    dispatch(loginUser(data));
    alert("Registration Successfull");
    navigate("/SignIn");
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">User Sign Up</h2>
      <form onSubmit={handleSubmit(myFunc)} className="border p-4 shadow rounded bg-light">
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="UserName"
            {...register('username')}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="form-control"
          />
          
        </div>
        <div className="form-group mb-3">
            <h3>gender</h3>
          <input
            type="radio"
            placeholder="Select Gender"
            name='gender'
            value='m'
            className="form-control"
          />male

          <input
            type="radio"
            placeholder="Select Gender"
            value='f'
            name='gender'
            className="form-control"
          />female
          </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
   
    </div>
  );
}

export default SignUp;

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './Store';

function SignIn() {
  let { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let myFunc = (data) => {
    dispatch(loginUser(data));
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">User Sign In</h2>
      <form onSubmit={handleSubmit(myFunc)} className="border p-4 shadow rounded bg-light">
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="UserName"
            {...register('username')}
            className="form-control"
            style={{ marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da' }}
            />
            <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="form-control"
            style={{ marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da' }}
            />
            <input
            type="email"
            placeholder="email"
            {...register('email')}
            className="form-control"
            style={{ marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da' }}
            />
            </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
      <p className="mt-3 text-center">
        New user? <a href="/SignUp">Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;

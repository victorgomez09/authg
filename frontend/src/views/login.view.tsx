import { SubmitHandler, useForm } from 'react-hook-form'
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

import { ILogin } from '../models/auth.model';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN } from '../constants';
import { getCurrentUser, login } from '../services/auth.service';
import useAuthStore from '../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [loginError, setLoginError] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({ mode: "onTouched" });
  const [setUser] = useAuthStore(state => [state.setUser])
  const navigate = useNavigate()

  const sendForm: SubmitHandler<ILogin> = async (data) => {
    try {
      const loginResponse = await login({ email: data.email, password: data.password });
      localStorage.setItem(ACCESS_TOKEN, loginResponse.accessToken)
      const user = await getCurrentUser();
      setUser(user);
      navigate("/")
    } catch (error) {
      setLoginError(true)
    }
  }

  return (
    <>
      {loginError && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Error! Bad credentials.</span>
            </div>
          </div>
        </div>
      )}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="card bg-base-100 shadow-md w-60 sm:w-96">
            <div className="card-body">
              <h2 className="card-title text-center inline">Welcome</h2>
              <h2 className="text-center font-thin">Sign in to AuthG to continue to AuthG</h2>
              <form className="mt-4" onSubmit={handleSubmit(sendForm)}>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="Type here" className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`} {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required"
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })} />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt italic text-error">{errors.email.message}</span>
                    </label>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Type here" className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`} {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required"
                    }
                  })} />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt italic text-error">{errors.password.message}</span>
                    </label>
                  )}
                </div>

                <div className="card-actions mt-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                </div>
              </form>

              <div className="divider">OR</div>

              <div className="grid grid-cols-1 gap-4">
                <a className="btn btn-outline gap-2" href={GOOGLE_AUTH_URL}>
                  <BsGoogle className="h-6 w-6" />
                  Google
                </a>

                <a className="btn btn-outline gap-2" href={GITHUB_AUTH_URL}>
                  <BsGithub className="h-6 w-6" />
                  Github
                </a>

                <a className="btn btn-outline gap-2" href={FACEBOOK_AUTH_URL}>
                  <BsFacebook className="h-6 w-6" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
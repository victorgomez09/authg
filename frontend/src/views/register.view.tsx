import { SubmitHandler, useForm } from 'react-hook-form'
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

import { IRegister } from '../models/auth.model';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL, FACEBOOK_AUTH_URL } from '../constants';
import { register as registerUser } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<IRegister>({ mode: "onTouched" });
    const navigate = useNavigate()
    const [registerError, setRegisterError] = useState(false);

    const sendForm: SubmitHandler<IRegister> = async (data) => {
        try {
            await registerUser(data);
            navigate("/login")
        } catch (error) {
            setRegisterError(true)
        }
    }

    return (
        <>
            {registerError && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Error! Something goes wrong.</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center w-12/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
                    <div className="card w-full bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-center inline">Welcome</h2>
                            <h2 className="text-center font-thin">Sign up to AuthG to continue to AuthG</h2>
                            <form className="mt-4" onSubmit={handleSubmit(sendForm)}>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Type here" className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} {...register("name", {
                                        required: {
                                            value: true,
                                            message: "name is required"
                                        }
                                    })} />
                                    {errors.name && (
                                        <label className="label">
                                            <span className="label-text-alt italic text-error">{errors.name.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control w-full">
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
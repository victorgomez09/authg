import { SubmitHandler, useForm } from "react-hook-form";
import { IApplication, ICreateApplication } from "../models/application.model";
import { useCustomMutation } from "../hooks/query.hook";
import { createApp } from "../services/application.service";
import { Navigate } from "react-router-dom";

export default function ApplicationsCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateApplication>({ mode: "onTouched" });
    const { mutate, isSuccess } = useCustomMutation<ICreateApplication, IApplication>((data) => createApp(data), ["findApplicationsByUser"])

    const sendForm: SubmitHandler<ICreateApplication> = (data) => {
        console.log('form', data)
        mutate(data);
    }

    if (isSuccess) return <Navigate to="/applications" />

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="card bg-base-100 shadow-md w-full h-full">
                <div className="card-body overflow-auto">
                    <h2 className="card-title">Create application</h2>

                    <form noValidate onSubmit={handleSubmit(sendForm)} className="mt-10">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Application one" className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} {...register("name", {
                                required: {
                                    value: true,
                                    message: "Application name is required"
                                },
                            })} />

                            {errors.name && (
                                <label className="label">
                                    <span className="label-text-alt text-error italic">{errors.name.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea placeholder="Application one description" className="textarea textarea-bordered w-full" {...register("description")} />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Identifier</span>
                            </label>
                            <input type="text" placeholder="Application one" className={`input input-bordered w-full ${errors.identifier ? "input-error" : ""}`} {...register("identifier", {
                                required: {
                                    value: true,
                                    message: "Application Identifier is required"
                                },
                            })} />

                            <label className="label">
                                <span className="label-text-alt font-thin">Identifier description</span>
                            </label>
                            {errors.identifier && (
                                <label className="label">
                                    <span className="label-text-alt text-error italic">{errors.identifier.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Token expiration</span>
                            </label>
                            <input type="number" placeholder="Application one" className={`input input-bordered w-full ${errors.tokenExpiration ? "input-error" : ""}`} {...register("tokenExpiration", {
                                required: {
                                    value: true,
                                    message: "Token expiration is required"
                                },
                            })} />

                            <label className="label">
                                <span className="label-text-alt font-thin">Token expiration duration in seconds</span>
                            </label>
                            {errors.tokenExpiration && (
                                <label className="label">
                                    <span className="label-text-alt text-error italic">{errors.tokenExpiration.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Type</span>
                            </label>
                            <select className={`select select-bordered ${errors.type ? "select-error" : ""}`} {...register("type", {
                                required: {
                                    value: true,
                                    message: "Application type is required"
                                }
                            })}>
                                <option disabled selected value="">Pick one</option>
                                <option value="API">API</option>
                                <option value="WEB">WEB</option>
                            </select>

                            {errors.type && (
                                <label className="label">
                                    <span className="label-text-alt text-error italic">{errors.type.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Signing algorithm</span>
                            </label>
                            <select className={`select select-bordered ${errors.signingAlgorithm ? "select-error" : ""}`} {...register("signingAlgorithm", {
                                required: {
                                    value: true,
                                    message: "Application signing algorithm is required"
                                }
                            })}>
                                <option value="RS256" selected>RS256</option>
                                <option value="HS256">HS256</option>
                            </select>

                            <label className="label">
                                <span className="label-text-alt font-thin">Once application is created, signing algorithm can't be changed</span>
                            </label>
                            {errors.signingAlgorithm && (
                                <label className="label">
                                    <span className="label-text-alt text-error italic">{errors.signingAlgorithm.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="card-actions justify-end mt-10">
                            <button className="btn btn-primary" type="submit">Create</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
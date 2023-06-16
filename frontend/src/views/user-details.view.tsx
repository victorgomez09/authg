import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCustomMutation, useCustomQuery } from "../hooks/query.hook"
import { IUser } from "../models/user.model"
import { addUserScopes, findUserById } from "../services/users.service"
import { IApplication, IApplicationScopes } from "../models/application.model"
import { findAppsByType } from "../services/application.service"

export default function UserDetails() {
    const params = useParams()
    const [selectedTab, setSelectedTab] = useState<"permissions" | "details" | "scopes">("details")
    const [selectedApp, setSelectedApp] = useState<IApplication>()
    const [selectedScopes, setSelectedScopes] = useState<IApplicationScopes[]>([])
    const { data: userData, isLoading: userIsLoading, error: userError } = useCustomQuery<string | undefined, IUser>(["findUserById"], () => findUserById(Number(params.id)), params.id)
    const { data: appData, isLoading: appsIsLoading, error: appsError } = useCustomQuery<string | undefined, IApplication[]>(["findApplicationsByUserAndType"],
        () => findAppsByType("api"), "api")
    const { mutate } = useCustomMutation<IApplicationScopes[], IUser>((data) => addUserScopes(Number(params.id), data), ["findUserById"])


    useEffect(() => {
        if (userData) setSelectedScopes(userData?.applicationScopes)
    }, [userData])

    if (userIsLoading || appsIsLoading) return (
        <div className="flex flex-1 items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    const updateSelectedScopes = (scope: IApplicationScopes) => {
        scope.application = selectedApp!
        const index = selectedScopes.findIndex(({ id }) => id === scope.id);
        const newSelectedScopesArray = index === -1
            ? [...selectedScopes, scope]
            : [...selectedScopes.slice(0, index), ...selectedScopes.slice(index + 1)];
        setSelectedScopes(newSelectedScopesArray)
    }

    const sendForm = () => {
        console.log({ selectedScopes })
        mutate(selectedScopes)
    }

    console.log('selectedApp?.scopes', selectedApp?.scopes)
    return (
        <>
            {userError || appsError && (
                <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Error! Something goes wrong.</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col justify-center">
                <div className="flex flex-col mb-4">
                    <h2 className="font-semibold text-2xl">{userData?.name.toUpperCase()}</h2>
                    {/* <span className="font-light text-sm">Identifier {appData?.identifier}</span>
                <span className="font-light text-sm">{appData?.type} application</span> */}
                </div>
                <div className="tabs tabs-boxed bg-base-100 shadow justify-center rounded-bl-none rounded-br-none border-b">
                    <a className={`tab ${selectedTab === "details" ? "tab-active" : ""}`} onClick={() => setSelectedTab("details")}>Details</a>
                    <a className={`tab ${selectedTab === "permissions" ? "tab-active" : ""}`} onClick={() => setSelectedTab("permissions")}>Permissions</a>
                </div>

                <div className="card bg-base-100 shadow w-full h-full rounded-tl-none rounded-tr-none">
                    <div className="card-body overflow-auto">
                        {selectedTab === "details" && (
                            <div className="flex flex-col gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input disabled type="text" className={`input input-bordered w-full`} value={userData?.name} />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input disabled type="email" className={`input input-bordered w-full`} value={userData?.email} />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Signed Up</span>
                                    </label>
                                    <input disabled type="date" className={`input input-bordered w-full`} value={userData?.creationDate?.toString()} />
                                </div>

                                <div className="divider"></div>

                                <div className="alert border-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Delete user</span>
                                    <div>
                                        <button className="btn btn-sm btn-error">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "permissions" && (
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <span>List of permissions this user has.</span>
                                    <button className="btn btn-sm btn-primary" onClick={() => window.add_premission_modal.showModal()}>Assign permission</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Permission</th>
                                                <th>Description</th>
                                                <th>Application</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData?.applicationScopes?.map((scope, index) => {
                                                return (
                                                    <tr className="hover" key={index}>
                                                        <td><div className="badge">{scope.scope}</div></td>
                                                        <td>{scope.description}</td>
                                                        <td>{scope.application.name}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <dialog id="add_premission_modal" className="modal">
                <form method="dialog" className="modal-box" onSubmit={() => sendForm()}>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Add permissions</h3>
                    <div className="flex flex-col mt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select permissions from existing APIs</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setSelectedApp(appData?.filter(app => app.id === Number(e.target.value))[0])} defaultValue="">
                                <option disabled value="">Pick one</option>
                                {appData?.map((app, index) => (
                                    <option value={app.id} key={index}>{app.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedApp != null && (
                        <div className="flex flex-col">
                            <div className="overflow-x-auto mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Permission</th>
                                            <th>Description</th>
                                            <th>Selected</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedApp?.scopes?.map((scope, index) => {
                                            return (
                                                <tr className="hover" key={index}>
                                                    <td><div className="badge">{scope.scope}</div></td>
                                                    <td>{scope.description}</td>
                                                    <td><input type="checkbox" className="checkbox" checked={selectedScopes.filter(s => s.id === scope.id).length > 0}
                                                        onChange={() => updateSelectedScopes(scope)} /></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <button type="submit" className="btn btn-sm btn-primary mt-4 self-end">Add permissions</button>
                        </div>
                    )}
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    )
}
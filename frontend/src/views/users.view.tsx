import { Link } from "react-router-dom"
import { useCustomQuery } from "../hooks/query.hook"
import { IUser } from "../models/user.model"
import { getUsers } from "../services/users.service"

export default function Users() {
    const { data, isLoading, error } = useCustomQuery<string | undefined, IUser[]>(["findUsers"], () => getUsers(), "")


    if (isLoading) return (
        <div className="flex flex-1 items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )
    console.log('data', data)

    return (
        <>
            {error && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Error! Something goes wrong.</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl">Users</h2>
                <Link to="/users/create" className="btn btn-primary">Create user</Link>
            </div>

            <div className="card bg-base-100 shadow-md w-full h-full mt-5">
                <div className="card-body overflow-auto">
                    {data?.length ? (
                        <div className="mt-10">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Applications</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((user, index) => {
                                            return (
                                                <tr className="hover" key={index}>
                                                    <th>{index}</th>
                                                    <td><Link to={`/users/${user.id}`} className="hover:text-primary cursor-pointer">{user.name}</Link></td>
                                                    <td>{user.email}</td>
                                                    <td>{user.applications.map((app, index) => {
                                                        return (
                                                            <span key={index}>{app.name}</span>
                                                        )
                                                    })}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    ) : (
                        <div className="mt-10">
                            <span>No applications created, create new <Link to="/applications/create" className="link link-primary">here</Link></span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
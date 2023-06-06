import { Link } from "react-router-dom"

import useAuthStore from "../stores/user.store"
import { useCustomQuery } from "../hooks/query.hook"
import { IApplication } from "../models/application.model"
import { findAppsByUser } from "../services/application.service"

export default function Home() {
    // const [dataType, setDataType] = useState<"orgs" | "apps">("apps")
    const [user] = useAuthStore(state => [state.user])
    const { data: applicationsData, isLoading: isApplicationDataLoading } = useCustomQuery<string | undefined, IApplication[]>(["findApplicationsByUser"], () => findAppsByUser(user?.email), user?.email)

    if (isApplicationDataLoading) return (
        <div className="flex flex-1 items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    return (
        <div className="flex flex-col flex-1">
            <h2 className="font-semibold text-2xl">Welcome back <span className="italic">{user?.name}</span></h2>
            <div className="grid grid-flow-col auto-cols-max gap-4 mt-5">
                <div className="stats shadow hover:scale-105">
                    <div className="stat text-primary">
                        <div className="stat-title">Applications</div>
                        <div className="stat-value">{applicationsData?.length}</div>
                        <div className="stat-desc">{applicationsData?.filter(app => app.type === "API").length} APIs - {applicationsData?.filter(app => app.type === "WEB").length} Webs</div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md w-full h-full mt-5">
                <div className="card-body overflow-auto">

                    <div className="overflow-x-auto mt-10">
                        {/* <div className="form-control w-64">
                    <label className="cursor-pointer label">
                        <span className="label-text me-2">Organizations</span>
                        <input type="checkbox" className="toggle toggle-primary" checked={dataType === "apps"} onChange={(e) => setDataType(e.target.checked ? "apps" : "orgs")} />
                        <span className="label-text ms-2">Applications</span>
                    </label>
                </div> */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Identifier</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicationsData?.map((app, index) => {
                                    return (
                                        <tr className="hover" key={index}>
                                            <th>{index}</th>
                                            <td><Link to={`/applications/${app.name}`} className="hover:text-primary cursor-pointer">{app.name}</Link></td>
                                            <td>{app.description}</td>
                                            <td>{app.identifier}</td>
                                            <td><div className={`badge badge-${app.type === "API" ? "secondary" : "accent"}`}>{app.type}</div></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
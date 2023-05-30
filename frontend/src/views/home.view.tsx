import { useState } from "react"
import useAuthStore from "../stores/user.store"

export default function Home() {
    const [dataType, setDataType] = useState<"orgs" | "apps">("apps")
    const [user] = useAuthStore(state => [state.user])

    return (
        <div className="flex flex-col">
            <h2 className="font-semibold text-2xl">Welcome back <span className="italic">{user?.name}</span></h2>
            <div className="grid grid-flow-col auto-cols-max gap-4 mt-10">
                <div className="stats shadow hover:scale-105">
                    <div className="stat">
                        <div className="stat-title">Organizations</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow hover:scale-105">
                    <div className="stat text-primary">
                        <div className="stat-title">Applications</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">2 APIs - 7 Webs</div>
                    </div>
                </div>

                <div className="stats shadow hover:scale-105">
                    <div className="stat text-info">
                        <div className="stat-title">Users</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">in organizations</div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mt-10">
                <div className="form-control w-64">
                    <label className="cursor-pointer label">
                        <span className="label-text me-2">Organizations</span>
                        <input type="checkbox" className="toggle toggle-primary" checked={dataType === "apps"} onChange={(e) => setDataType(e.target.checked ? "apps" : "orgs")} />
                        <span className="label-text ms-2">Applications</span>
                    </label>
                </div>
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr className="hover">
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
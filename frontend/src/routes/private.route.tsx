import { NavLink, Navigate, Outlet } from "react-router-dom"

import useAuthStore from "../stores/user.store";
import { Navbar } from "../components/navbar.component";

export const PrivateRoute = () => {
    const [user] = useAuthStore(state => [state.user])

    if (user != null && user.email && user.name)
        return (
            <div className="flex flex-col h-full">
                <Navbar />
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-1 flex-col p-4 mt-16 bg-base-200">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                        <Outlet />
                    </div>
                    <div className="drawer-side bg-base-100 shadow-md">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu px-4 w-80 text-base-content mt-16">
                            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
                            <li><NavLink to="/organizations" className={({ isActive }) => (isActive ? 'active' : '')}>Organizations</NavLink></li>
                            <li><NavLink to="/applications" className={({ isActive }) => (isActive ? 'active' : '')}>Applications</NavLink></li>
                            <li><NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>Users</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    return <Navigate to="/login" />
}
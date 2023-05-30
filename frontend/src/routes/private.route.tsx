import { Link, NavLink, Navigate, Outlet } from "react-router-dom"

import useAuthStore from "../stores/user.store";
import { Navbar } from "../components/navbar.component";

export const PrivateRoute = () => {
    const [user] = useAuthStore(state => [state.user])

    if (user != null && user.email && user.name)
        return (
            <div className="flex flex-col h-full">
                <Navbar />
                <div className="drawer drawer-mobile h-full">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                        <div className="py-2 px-4">
                            <Outlet />
                        </div>
                    </div>

                    <div className="drawer-side shadow-xl border-r z-40">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-60 bg-base-100 text-base-content">
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
import { Navigate, Outlet } from "react-router-dom"

import useAuthStore from "../stores/user.store";

export const PrivateRoute = () => {
    const [user] = useAuthStore(state => [state.user])

    if (user != null && user.email && user.name)
        return <Outlet />

    return <Navigate to="/auth" />
}
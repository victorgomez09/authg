import { Navigate, Outlet } from "react-router-dom"
import { getCurrentUser } from "../services/auth.service"
import useAuthStore from "../stores/user.store";

export const PrivateRoute = () => {
    const { setUser } = useAuthStore(state => ({setUser: state.setUser}))

    getCurrentUser()
    .then(response => {
        setUser(response)
        return <Outlet />
    }).catch(error => {
        console.log('error', error)
    });

    return <Navigate to="/auth" />
}
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {

    return (
        !loggedIn ? <Outlet /> : <Navigate to="/movies" />
    )
}

export default ProtectedRoute;
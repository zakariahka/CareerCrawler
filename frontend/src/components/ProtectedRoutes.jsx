import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { userData } = useContext(UserContext);
    return userData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

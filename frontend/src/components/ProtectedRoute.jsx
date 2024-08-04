import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";
 
const ProtectedRoute = () => {
    const { userToken } = useContext(UserContext);
    return userToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute
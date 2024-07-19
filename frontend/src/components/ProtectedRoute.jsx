const ProtectedRoute = () => {
    const { userToken } = useContext(UserContext);
    return userToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute
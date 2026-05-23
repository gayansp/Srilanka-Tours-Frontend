import { Navigate, Outlet } from "react-router-dom";

const AdminMiddleware = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminMiddleware;
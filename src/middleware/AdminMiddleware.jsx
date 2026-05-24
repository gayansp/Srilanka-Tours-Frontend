import { Navigate, Outlet } from "react-router-dom";

const AdminMiddleware = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }


    if (role !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default AdminMiddleware;
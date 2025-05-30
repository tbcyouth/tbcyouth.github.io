import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const authGroup = localStorage.getItem("authGroup");
    const location = useLocation();

    if (!authGroup) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

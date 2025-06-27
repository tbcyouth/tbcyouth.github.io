// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const groupId = localStorage.getItem("groupId");
    const location = useLocation();

    if (!groupId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

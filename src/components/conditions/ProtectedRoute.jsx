// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import {getAuthGroup} from "../../utils";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const auth = getAuthGroup()

    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

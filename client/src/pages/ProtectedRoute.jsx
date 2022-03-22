import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }){
    const location = useLocation();
    return localStorage.getItem("accessToken") ?
    children
    :
    <Navigate to="/signin" replace state={{ from: location }} />
} 

export default ProtectedRoute;
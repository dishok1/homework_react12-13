import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAllowed }) => {
  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

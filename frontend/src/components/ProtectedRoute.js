import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isLogged}) => {
  if (!isLogged) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

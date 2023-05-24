import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={"/"} />;
};

export default PublicRoute;

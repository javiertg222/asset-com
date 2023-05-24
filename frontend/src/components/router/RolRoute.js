import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import decodeToken from "../../utils/decodeToken";

const RolRoute = ({ rol }) => {
  const { isAuthenticated } = useAuthContext();

  const decode = decodeToken(isAuthenticated);

  if (decode.user.rol !== rol) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default RolRoute;

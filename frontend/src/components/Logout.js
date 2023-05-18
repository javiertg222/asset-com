import storage from "../utils/storage";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  storage.remove("token");
  navigate("/", {replace: true})
}

export default Logout;

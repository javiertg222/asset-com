import storage from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();
  storage.remove("token");
  useEffect(() => {
    navigate("/");
  }, [navigate]);
}

export default Logout;

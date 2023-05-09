import storage from "../utils/storage";
function Logout() {
  storage.remove("token");
}

export default Logout;

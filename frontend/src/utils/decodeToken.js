import jwt_decode from "jwt-decode";

const decodeToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  jwt_decode(token);
};

export default decodeToken;

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import { Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Settings from "./components/admin/Settings";
import NotFound404 from "./components/NotFound404";
import Administration from "./components/admin/Administration";
import UserForm from "./components/admin/UserForm";
import UsersList from "./components/admin/UsersList";
import AssetForm from "./components/asset/AssetForm";
import AssetsList from "./components/asset/AssetsList";
import ChangePass from "./components/ChangePass";
import BarCode from "./components/BarCode";
import Backups from "./components/admin/Backups";
import ProtectedRoute from "./components/ProtectedRoute";
import storage from "./utils/storage";
import decodeToken from "./utils/decodeToken";
import { useState, useEffect } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const token = storage.get("token");
  const [user, setUser] = useState(null)
  console.log(token)
  useEffect(() => {
  if (token) {
    setUser(decodeToken(token));
    setIsLogged(true)
  }
},[isLogged, token]);
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute isLogged={isLogged} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/password" element={<ChangePass />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<Administration />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/users/form" element={<UserForm />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/backups" element={<Backups />} />
            <Route path="/assets" element={<AssetsList />} />
            <Route path="/assets/form" element={<AssetForm />} />
            <Route path="/barcode" element={<BarCode />} />
          </Route>
          <Route path="/404" element={<NotFound404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;

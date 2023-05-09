import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const token = storage.get("token");
  let user ={};
  if (token!=null) {
    user = decodeToken(storage.get("token"));
  }

  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user.user} />}>
            <Route index element={<LoginForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/password" element={<ChangePass />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/admin/settings" element={<Settings />}></Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  isAllowed={!!user.user && user.user.rol.includes("admin")}
                  redirectTo="/home"
                >
                  <Administration />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/admin/users" element={<UsersList />}></Route>
            <Route path="/admin/users/form" element={<UserForm />}></Route>
            <Route path="/admin/backups" element={<Backups />}></Route>
            <Route path="/assets" element={<AssetsList />}></Route>
            <Route path="/assets/form" element={<AssetForm />}></Route>
            <Route path="/barcode" element={<BarCode />}></Route>
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

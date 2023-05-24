import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Settings from "./components/admin/Settings";
import NotFound404 from "./components/NotFound404";
import Administration from "./components/admin/Administration";
import UserForm from "./components/admin/UserForm";
import UsersList from "./components/admin/UsersList";
import AssetForm from "./components/asset/AssetForm";
import AssetsList from "./components/asset/AssetsList";
import ChangePass from "./components/user/ChangePass";
import BarCode from "./components/BarCode";
import Backups from "./components/admin/Backups";
import Ayuda from "./components/Ayuda";
import Perfil from "./components/user/Perfil";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import RolRoute from "./components/router/RolRoute";
import { AuthContextProvider } from "./contexts/authContext";


function App() {
  
  return (
    <>
      <div className="App">
        <AuthContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/login" element={<PublicRoute />}>
                <Route index element={<LoginForm />} />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Home />} />
                <Route path="/inicio" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/password" element={<ChangePass />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/assets" element={<AssetsList />} />
                <Route path="/assets/form" element={<AssetForm />} />
                <Route path="/barcode" element={<BarCode />} />
                <Route path="/ayuda" element={<Ayuda />} />
                <Route path="/admin" element={<RolRoute rol={"admin"}/>}>
                  <Route index element={<Administration />} />
                  <Route path="/admin/users" element={<UsersList />} />
                  <Route path="/admin/users/form" element={<UserForm />} />
                  <Route path="/admin/settings" element={<Settings />} />
                  <Route path="/admin/backups" element={<Backups />} />
                </Route>
              </Route>
              <Route path="/404" element={<NotFound404 />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;

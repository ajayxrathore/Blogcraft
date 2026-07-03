import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./services/auth/authService";
import "./App.css";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { login, logout } from "./features/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => {
        dispatch(login(response.user));
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : null;
}

export default App;

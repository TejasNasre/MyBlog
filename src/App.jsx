import conf from "./conf/conf.js";
import {Header,Footer} from "./components/index.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispath = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispath(login({ userData }));
        } else {
          dispath(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <>
      <h1 className="min-h-screen flex flex-wrap content-between">
        <Header/>
        <Footer/>
      </h1>
    </>
  ) : null;
}

export default App;

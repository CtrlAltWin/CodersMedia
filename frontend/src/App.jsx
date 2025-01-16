import { useDispatch } from "react-redux";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser } from "./Utils/userSlice";
import axios from "axios";
import { baseUrl } from "./Utils/url";

function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const fetchUser = async () => {
    try {
      const res = await axios.get(baseUrl + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/");
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser } from "./utils/userSlice";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(backendUrl + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

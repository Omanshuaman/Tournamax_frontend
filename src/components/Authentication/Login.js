import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = ({ setonClick1 }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUser } = ChatState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please fill in all the fields.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosInstance.post(
        "/user/login",
        {
          email,
          password,
        },
        config
      );

      toast.success("Login Successful.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const userInfo = localStorage.setItem("userInfo", JSON.stringify(data));

      setUser(userInfo);

      setLoading(false);
      setonClick1(false);

      document.location.reload();
    } catch (error) {
      toast.error("Login Failed.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const google = async () => {
    window.location.href = "https://tournamaxsports.com/api/auth/google";
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            type={show ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>{show ? "Hide" : "Show"}</button>
        </div>
      </div>
      <button onClick={submitHandler} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
      <button onClick={google} disabled={loading}>
        {loading ? "Loading..." : "Sign in with Google"}
      </button>
      <ToastContainer />
    </div>
  );
};
export default Login;

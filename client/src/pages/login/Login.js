import React, { useState } from "react";
import axios from "../../axios/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import "./Login.css"
import { handleLogin } from "../../slices/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/user/login", user);
      localStorage.setItem("token", data.data.token)
      dispatch(handleLogin(data.data.token))
      if (data) {
        toast.success(data.message, {
          pauseOnHover: false,
          closeOnClick: true,
          autoClose: 2000,
        });
        setUser({
          email: "",
          password: ""
        })
        navigate("/");
      }
    } catch (error) {
      setLoading(true)
      if (error.response.status === 403) {
        toast.error(error.response.data.message, {
          pauseOnHover: false,
          closeOnClick: true,
          autoClose: 2000,
        });
        localStorage.setItem("token", error.response.data.data.token);
        setTimeout(() => {
          navigate("/verify");
        }, 3000);
      } else if (
        error.response.status === 401 ||
        error.response.status === 500
      ) {

        toast.error(error.response.data.message, {
          pauseOnHover: false,
          closeOnClick: true,
          autoClose: 2000,
        });
      }
      setTimeout(() => {
        setLoading(false)
      }, 3000)

    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://www.sparkouttech.com/assets/images/logo/logo.svg"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={user.email}
            onChange={handleChange}
          />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="forgot-password-containers">
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </div>
          <button
            className="login__signInButton"
            type="submit"
            disabled={loading}
            onClick={handleClick}
          >Login</button>
        </form>
        <p>By Signing-In You Agree To <b>Spark Out's</b> Condition Of Use & Sale.Please
          see our Privacy Noticy, Our Cookies Notice And Our Internet-Based Ads Notice.
        </p>
        <Link to='/signup' >
          <button className="login__registerButton">Create Your Sparkout Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

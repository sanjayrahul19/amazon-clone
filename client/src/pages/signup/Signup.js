import React, { useState } from "react";
import axios from "../../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => {
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
      const { data } = await axios.post("/user/signup", formData);
      if (data) {
        localStorage.setItem("token", data.data);
        toast.success(data.message, {
          pauseOnHover: false,
          closeOnClick: true
        });
        navigate("/verify");
      }
    } catch (error) {
      setLoading(true);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, {
          pauseOnHover: false,
          closeOnClick: true
        });
      }
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  };

  return (
    <div className="signup">
      <Link to="/">
        <img
          className="signup__logo"
          src="https://www.sparkouttech.com/assets/images/logo/logo.svg"
          alt=""
        />
      </Link>
      <div className="signup__container">
        <h1>Sign Up</h1>

        <form>
          <h5>E-mail</h5>

          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <h5>Password</h5>

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <h5>confirm Password:</h5>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Enter your confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="signup__signInButton"
            type="submit"
            onClick={handleClick}
            disabled={loading}
          >
            Sign up
          </button>
          <Link to="/login" className="signup__alreadyAccountLink">Already Have An Account?</Link>
        </form>
        <p>
          By Signing-Up You Agree To <b>Spark Out's</b> Condition Of Use &
          Sale.Please see our Privacy Policy, Our Cookies Notice And Our
          Internet-Based Ads Notice.
        </p>
      </div>
    </div>
  );
};

export default Signup;

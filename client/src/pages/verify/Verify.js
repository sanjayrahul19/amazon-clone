import React, { useState, useRef } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Verify.css";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    try {
      const { data } = await axios.post(
        "/user/verify",
        {
          otp: parseInt(otpString),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (data.status) toast.success(data.message,{
        pauseOnHover:false,
        closeOnClick:true
    });
     localStorage.removeItem("token")
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if (error.response.data && error.response) {
        toast.error(error.response.data.message,{
          pauseOnHover:false,
          closeOnClick:true
      });
      }
    }
  };

  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < 3) {
        refs[index + 1].current.focus();
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="center-content">
        <img
          className="login__logo"
          src="https://www.sparkouttech.com/assets/images/logo/logo.svg"
          alt=""
        />
        <form className="form">
          <label className="label">OTP: </label>
          {otp.map((digit, index) => {
            return (
              <input
                key={index}
                className="input"
                name={`digit-${index}`}
                type="number"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                maxLength="1"
                ref={refs[index]}
              />
            );
          })}

          <button className="button" onClick={handleClick}>
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;

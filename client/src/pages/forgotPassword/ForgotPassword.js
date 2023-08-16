import React, { useState } from 'react';
import "./ForgotPassword.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../axios/axios"


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            if(email==="") return alert("Enter your Email")
            const { data } = await axios.post("/user/forgot-password", { email })
            if (data) {
                toast.dismiss()
                toast.success(data.message, {
                    pauseOnHover: false,
                    closeOnClick: true,
                    autoClose:2000,
                    newestOnTop:true
                });
            }
            setEmail("")
            setTimeout(() => {
                toast.dismiss()
                navigate("/")
            }, 3000)
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 500) {
                toast.error(error.response.data.message, {
                    pauseOnHover: false,
                    closeOnClick: true
                });
            }
        }
    }
    return (
        <div className='forgot-password'>
            <Link to="/" className="login__logo-link">
                <img
                    className="login__logo"
                    src="https://www.sparkouttech.com/assets/images/logo/logo.svg"
                    alt=""
                />
            </Link>
            <div className="forgot-password-container">
                <h1 className="forgot-password-heading">Forgot Password</h1>
                <p className="forgot-password-subheading">Don't worry, we'll help you reset it.</p>
                <form>
                    <div className="forgot-password-input-container">
                        <h5><label className="forgot-password-label" htmlFor="email">E-mail</label></h5>
                        <input
                            type="text"
                            id="email"
                            className="forgot-password-input"
                            name="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="forgot-password-button" onClick={handleClick}>Send Reset Link</button>
                </form>
                <p className="forgot-password-text">Remember your password? <Link to="/login">Sign In</Link></p>
            </div>
        </div>
    );
}

export default ForgotPassword
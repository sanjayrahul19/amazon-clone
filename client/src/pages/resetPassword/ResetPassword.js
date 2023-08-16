import React, { useState } from 'react';
import "./ResetPassword.css";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "../../axios/axios"

const ResetPassword = () => {
    const [details, setDetails] = useState({
        password: "",
        confirmPassword: ""
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch("/user/reset-password", details, {
                headers: {
                    Authorization: id
                }
            })
            if (data) {
                toast.dismiss()
                toast.success(data.message, {
                    pauseOnHover: false,
                    closeOnClick: true,
                    autoClose:2000,
                    newestOnTop:true
                });
            }
            setDetails({
                password: "",
                confirmPassword: ""
            })
            setTimeout(() => {
                toast.dismiss()
                navigate("/login")
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
        <div className='reset-password'>
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://www.sparkouttech.com/assets/images/logo/logo.svg"
                    alt=""
                />
            </Link>
            <div className="reset-password-container">
                <h1>Reset Password</h1>
                <form>
                    <h5>New Password</h5>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={details.password}
                        onChange={handleChange}
                    />
                    <h5>Confirm Password</h5>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter your Confirm Password"
                        value={details.confirmPassword}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
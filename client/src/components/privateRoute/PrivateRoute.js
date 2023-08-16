import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, handleLogin } from "../../slices/userSlice";
import { Navigate, Outlet } from "react-router-dom";
import "./Private.css";

const PrivateRoute = () => {
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(handleLogin(token));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
      <div className="loading-spinner"></div>
      <h1>Loading...</h1>
    </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />
};

export default PrivateRoute;

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "@mui/icons-material";
import image from "../../image/spark.png";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser, handleLogin, logout } from "../../slices/userSlice";
import { getBasket } from "../../slices/basketSlice";

const Header = () => {
  const user = useSelector(getUser);
  const split = user?.email.split("@");
  const basket=useSelector(getBasket)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(handleLogin(token));
    }
  }, []);

  const login = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="header">
      <Link to="/">
        <img className="header_logo" src={image} alt="logo" />
      </Link>
      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <Search className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"} className="header_link">
          <div className="header_option" onClick={login}>
            <span className="header_optionLineOne">Hello {user?split[0]:null}</span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne">Return</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link to="/orders" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne">Your</span>
            <span className="header_optionLineTwo">Prime</span>
          </div>
        </Link>
        <Link to="/checkout" className="header_link">
          <div className="header_optionBasket">
            <ShoppingCart />
            <span className="header_optionLineTwo header_basketCount">{basket.length}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;

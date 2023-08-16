import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home/Home";
import Verify from "./pages/verify/Verify";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Payment from "./pages/payment/Payment";
import Checkout from "./pages/checkout/Checkout";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import NotFound from "./components/notFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/pay/:id"
            element={
              <>
                <Header />
                <Payment />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/reset-password/:id' element={<ResetPassword/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

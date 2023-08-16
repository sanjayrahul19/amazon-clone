import React from "react";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../../slices/basketSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CheckoutProduct.css";

const CheckoutProduct = ({ id, title, image, price, rating }) => {
  const dispatch = useDispatch();

  const removeFromBas = () => {
    dispatch(removeFromBasket(id));
    toast.dismiss()
    toast.success(`${title} Removed Successfully`, {
      pauseOnHover: false,
      closeOnClick: true,
      autoClose: 2000,
      newestOnTop: true
    });
  };


  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <span key={index}>⭐</span>
            ))}
        </div>
        <button onClick={removeFromBas}>Remove From Basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;

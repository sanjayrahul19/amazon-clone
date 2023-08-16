import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";

const Product = ({ id, title, image, price, rating }) => {
  const dispatch = useDispatch();

  const addToBas = () => {
    dispatch(addToBasket({ id, title, image, price, rating }));
    toast.dismiss()
    toast.success(`${title} Added To Cart`,{
      pauseOnHover:false,
      closeOnClick:true,
      autoClose:2000,
      newestOnTop:true
  });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <span role="img" aria-label="rating" key={index}>
                ⭐
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBas}>Add to basket</button>
    </div>
  );
};

export default Product;

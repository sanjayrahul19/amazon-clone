import React from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";
import { getBasket } from "../../slices/basketSlice";
import { getUser } from "../../slices/userSlice";
import CheckoutProduct from "../../components/checkoutProduct/CheckoutProduct";
import Subtotal from "../../components/subtotal/Subtotal";

const Checkout = () => {
  const basket = useSelector(getBasket)
  const user = useSelector(getUser)
  const split = user?.email.split("@")

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._C8423492668_.jpg"
          alt=""
        />
        {basket.length === 0 ? (
          <div>
            <p style={{ display: "inline-block", fontSize: "18px" }}>Hello,&nbsp;</p>
            <p style={{ fontSize: "28px", display: "inline-block", }}>
              <b style={{ color: "#FD6C19" }}>{split[0]}</b>
            </p>

            <h2>Your Shopping Basket Is Empty</h2>
            <p>
              You Have No Items In Your Basket. To Buy Or More Items,Click "Add
              To Basket" Next To The Item.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
      {
        basket.length > 0 && (<div className="checkout__right">
          <Subtotal />
        </div>)
      }
    </div>
  );
};

export default Checkout;

import React, { useState } from 'react';
import "./Order.css";


const Order = ({ id, items, total, createdAt }) => {
    const [showProducts, setShowProducts] = useState(false)

    return (
        <div className='order'>
            <img className='order__image' src="https://img.freepik.com/premium-vector/continuous-line-drawing-shopping-cart-minimal-line-icon-white-background-icon-banner-vector-illustration_41981-2060.jpg?w=2000" alt='' />
            <div className='order__info'>
                <p className='order__title'>Order Id: {id}</p>
                <p className='order__price'>
                    <small>₹</small>
                    <strong>{total}</strong>
                </p>
                <div className='order__showProducts'>
                    <p>Number of product Orders: {items.length}</p>
                    <button onClick={() => setShowProducts((curr) => !curr)}>{showProducts ? "Hide All" : "Show All"}</button>
                </div>
                <p>Order At:<strong> {new Date(createdAt).toString().slice(0, 25)}</strong></p>
                {
                    showProducts && (
                    <div className='order__products'>
                        {
                            items.map((item, index) => {
                                return (<div className='order__product' key={index}>
                                    <img  src={item.image} alt='' />
                                    <div className='order__productTop'>
                                        <h4>{item.title}</h4>
                                        <p><small>₹</small>
                                            <strong>{item.price}</strong>
                                        </p>
                                        <div className="order__rating">
                                            {Array(item.rating)
                                                .fill()
                                                .map((_, index) => (
                                                    <span key={index} role="img" aria-label="rating" >
                                                        ⭐
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>)
                }
            </div>
        </div>
    )
}

export default Order
import React, { useState, useEffect } from 'react';
import "./Orders.css";
import Order from '../../components/order/Order';
import axios from "../../axios/axios"

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get("/checkout/orders", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      setOrders(data.data)
    }
    getOrders()
  }, []);


  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img className="checkout__ad" src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._C8423492668_.jpg' alt='' />
        {orders.length === 0 ? (<div>
          <h2>Your Orders is empty</h2>
          <p>You have not make any orders</p>
        </div>) : (<div>
          <h2 className='checkout__title'>Your Orders</h2>
          {
            orders.map((order, index) => {
              return <Order
                key={index}
                id={order.order_id}
                items={order.items}
                total={order.total}
                createdAt={order.createdAt}
              />
            })
          }
        </div>)}
      </div>
    </div>
  )
}

export default Orders
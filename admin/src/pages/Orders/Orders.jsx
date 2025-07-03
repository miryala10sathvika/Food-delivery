import React from 'react'
import './Orders.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from "../../assets/assets"
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error("Something went wrong, please try again later");
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event,orderId) => {
    const status = event.target.value;
    const response = await axios.post(url + '/api/order/status', { orderId, status });
    if (response.data.success) {
      toast.success("Order status updated successfully");
      fetchAllOrders();
    }
    else {
      toast.error("Something went wrong, please try again later");
    }
  }
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  }
                  else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>

              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} >
              <option value="Food Processing">Pending</option>
              <option value="out for delivery">In Progress</option>
              <option value="delivered">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders

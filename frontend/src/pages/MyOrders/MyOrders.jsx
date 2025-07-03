import React, { useEffect } from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios';
import { assets } from '../../assets/assets'
const MyOrders = () => {

    const { token, url } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const fetchOrders = async () => {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data.data);
        
    }
    useEffect(() => {
        if(token){
            fetchOrders();
        }
    }, [token]);
  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index) => {
                return(
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) => {
                                if(index===order.items.length-1){
                                    return `${item.name} x ${item.quantity}`;
                                }
                                else{
                                    return `${item.name} x ${item.quantity}, `;
                                }
                            })}
                        </p>
                        <p>${order.total}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders

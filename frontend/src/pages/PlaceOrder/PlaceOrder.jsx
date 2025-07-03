import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function PlaceOrder() {
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({ ...data, [name]: value }));
  }
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);

      }
    })
    let orderData = {
      address:data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount()===0 ? 0 : 2)

    }
    let response =await axios.post(`${url}/api/order/place`, orderData, {headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Something went wrong, please try again later");
    }
  }
  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else{
      if(getTotalCartAmount()===0){
        navigate('/cart');
      }
    }
  },[token])

  return (
    <div>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">
            Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
          </div>
          <div className="multi-fields">
            <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='zip code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone number' />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount()===0 ? 0 : 2)}</b>
            </div>
            <div className="cart-total-details"></div>
            
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder

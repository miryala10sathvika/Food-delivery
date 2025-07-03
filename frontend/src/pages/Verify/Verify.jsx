import React, { useEffect } from 'react'
import './Verify.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const orderId = searchParams.get("orderId");
    const success = searchParams.get("success");
    const navigate = useNavigate();
    const {url}=useContext(StoreContext);
    const verifyPayment = async () => {
        const response = await axios.post(`${url}/api/order/verify`, { orderId, success });
        if (response.data.success) {
            alert("Order verified successfully");
            navigate("/myorders");
        } else {
            alert("Failed to verify order");
            navigate("/");
        }
    };
    useEffect(() => {
        verifyPayment();
    }, []);
    return (
        <div className='verify'>
            <div className="spinner">

            </div>
        </div>
    )
}

export default Verify

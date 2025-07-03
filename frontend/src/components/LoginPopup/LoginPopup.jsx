import React, { useContext } from 'react'
import "./LoginPopup.css"
import { useState } from 'react'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/storeContext';
function LoginPopup({ setShowLogin }) {
    const {url, token, setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        let newurl=url;
        if (currState === "Login") {
            newurl += "/api/users/login";
        } else {
            newurl += "/api/users/register";
        }
        const response = await axios.post(newurl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-popup-input'>
                    {currState === "Login" ? <></> : <input name ='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name ='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name ='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
                </div>
                <button type="submit">{currState === "Signup" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I accept the <a href="#">Terms & Conditions</a></label>
                </div>
                {currState === "Login"
                    ? <p>Create a new account ? <span onClick={() => setCurrState("Signup")}> Click here</span></p>
                    : <p>Already have an account <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }


            </form>
        </div>
    )
}

export default LoginPopup

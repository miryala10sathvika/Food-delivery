import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>FoodDelivery website is authentic and serving cutomers from several years. Our thousands of customers trust us for their food delivery needs.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook" />
                    <img src={assets.twitter_icon} alt="Instagram" />
                    <img src={assets.linkedin_icon} alt="Twitter" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>Email: info@fooddelivery.com</li>
                    <li>Phone: +1 234 567 890</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">© 2025 Food Del. All rights reserved.</p>
    </div>
  )
}

export default Footer 

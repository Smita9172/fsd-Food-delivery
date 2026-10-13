import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
        <h1 id="companyName" className="logo">RiDER</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
            nostrum iure suscipit maiores non harum incidunt unde magnam
            molestias ipsum qui vel aut natus aspernatur ipsa dignissimos,
            numquam assumenda deserunt.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-8923364266</li>
            <li>contact@rider.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ RiDER.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;

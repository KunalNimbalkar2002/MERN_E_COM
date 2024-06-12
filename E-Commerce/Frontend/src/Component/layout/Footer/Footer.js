import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="left-footer">
        <h4>Download Our App</h4>
        <p>Download app for IOS and Android</p>
      </div>
      <div className="mid-footer">
        <h1>Ecommerce</h1>
        <p>High quality is our first Priority</p>

        <p>Copyrights 2024 &copy; CEO </p>
      </div>
      <div className="right-footer">
        <h4>Follow Us </h4>
        <a href="https://katalysttech.com/">Google</a>
        <a href="https://katalysttech.com/">Instagram</a>
        <a href="https://katalysttech.com/">Fcebook</a>
      </div>
    </footer>
  );
};

export default Footer;

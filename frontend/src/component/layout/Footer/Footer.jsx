import React from "react";
import playStore from "../../../image/playstore.png";
import appStore from "../../../image/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="Play Store" />
        <img src={appStore} alt="App store" />
      </div>
      <div className="midFooter">
        <h1>Qg3</h1>
        <p>High Quality is our first priority</p>
        <p>Copyright 2021 &copy; Qg3</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/insta">Instagram</a>
        <a href="/youtube">YouTube</a>
        <a href="/facebook">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;

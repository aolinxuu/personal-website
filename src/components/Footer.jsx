import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span>Email: aolinxu@gmail.com</span>
      <div>
        <img src="GitHub.svg" alt="GitHub" className="footerIcons" />
        <img src="Linkedin.svg" alt="LinkedIn" className="footerIcons" />
        <img src="TikTok.svg" alt="Twitter" className="footerIcons" />
        <img src="Instagram.svg" alt="Instagram" className="footerIcons" />
      </div>
    </div>
  );
};

export default Footer;

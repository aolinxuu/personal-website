import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span>
        email:{" "}
        <a href="mailto:aolinxu@gmail.com" style={{ color: "#d973b0" }}>
          aolinxu@gmail.com
        </a>
      </span>
      <div>
        <a href="https://github.com/aolinxuu" target="_blank" rel="noopener noreferrer">
          <img src="GitHub.svg" alt="GitHub" className="footerIcons" />
        </a>
        <a href="https://www.linkedin.com/in/aolin-xu-b01798194/" target="_blank" rel="noopener noreferrer">
          <img src="Linkedin.svg" alt="LinkedIn" className="footerIcons" />
        </a>
        <a href="https://www.tiktok.com/@aolinxu" target="_blank" rel="noopener noreferrer">
          <img src="TikTok.svg" alt="Twitter" className="footerIcons" />
        </a>
        <a href="https://www.instagram.com/aolin_xu/?hl=en" target="_blank" rel="noopener noreferrer">
          <img src="Instagram.svg" alt="Instagram" className="footerIcons" />
        </a>
      </div>
    </div>
  );
};

export default Footer;

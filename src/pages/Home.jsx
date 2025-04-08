import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div>
        <p className="heading">Hello there! I'm Aolin, a developer, content creator, mentor and student.</p>
        <div className="links">
          <a href="resume.pdf">Click here for my Resume</a>
          <a href="resume.pdf">Click here for my Media Kit</a>
          <p>FYI: this website is currently under construction so some pages/links may not work.</p>
        </div>
      </div>
      <img src="memoji.jpg" alt="Aolin's memoji" className="memoji"></img>
    </div>
  );
};

export default Home;

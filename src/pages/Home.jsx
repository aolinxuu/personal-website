import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div>
        <p className="heading">Hello there! I'm Aolin, a developer, content creator, mentor and student.</p>
        <div className="links">
          <a href="link_to_resume.pdf">Click here for my Resume</a>
          <a href="link_to_media_kit.pdf">Click here for my Media Kit</a>
        </div>
      </div>
      <img src="memoji.jpg" alt="Aolin's memoji" className="memoji"></img>
    </div>
  );
};

export default Home;

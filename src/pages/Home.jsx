import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const roles = ["software engineer", "content creator", "teacher", "mentor", "student"];
  const baseText = "Hello there! I'm Aolin, a ";
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout;

    if (!isDeleting) {
      // Typing
      if (displayText.length < baseText.length + currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(baseText + currentRole.slice(0, displayText.length - baseText.length + 1));
        }, 100);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayText.length > baseText.length) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Move to next role
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentRoleIndex, isDeleting]);

  return (
    <div className="container">
      <div>
        <p className="heading">
          {displayText}
          <span className="cursor"></span>
        </p>
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

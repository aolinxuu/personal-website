import React from "react";
import "./Work.css";

const Work = () => {
  return (
    <div className="work-container">
      <div className="work-title">Technical Stuff</div>
      <div className="projects-container">
        <div className="project-row">
          <div className="project-card study-timer-card">
            <p>LockIn - Study Timer</p>
            <div className="tags-container">
              <div className="tag">Python</div>
              <div className="tag">PyQt5</div>
            </div>
            <div className="links-container">
              <div className="github-link">
                <a href="https://github.com/aolin-zhang/LockIn">view on github</a>
              </div>
              <div className="download-link">
                <a href="/path-to-download">click to download my app</a>
              </div>
            </div>
          </div>
          <div className="project-description">
            <p>
              A simple cross-platform study timer with button controls that plays audio cues at key intervals, changes
              colors based on progress to help you stay focused.
            </p>
          </div>
        </div>
        <div className="project-row">
          <div className="project-card company-card">
            <p>Company Recommendation System</p>
            <div className="tags-container">
              <div className="tag">Python</div>
              <div className="tag">Machine Learning</div>
            </div>
            <div className="links-container">
              <div className="github-link">
                <a href="https://github.com/aolin-zhang/LockIn">view on github</a>
              </div>
            </div>
          </div>
          <div className="project-description">
            <p>
              Description of your work at OpenAI goes here. You can include details about your role, projects, and
              achievements.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="work-title"> Collaborations</div>
      <div className="work-title"> Workshops</div> */}
    </div>
  );
};

export default Work;

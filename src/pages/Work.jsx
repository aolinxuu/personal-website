import React from "react";
import "./Work.css";

const Work = () => {
  return (
    <div className="work-container">
      <div className="work-title">Technical Stuff</div>
      <div className="projects-container">
        <div className="project-row">
          <div className="project-card openai-card">
            <p>OpenAI</p>
          </div>
          <div className="project-description">
            <h3>OpenAI</h3>
            <p>
              Description of your work at OpenAI goes here. You can include details about your role, projects, and
              achievements.
            </p>
          </div>
        </div>

        <div className="project-row">
          <div className="project-card royal-hospital-card">
            <p>The Royal Hospital for Women</p>
          </div>
          <div className="project-description">
            <h3>The Royal Hospital for Women</h3>
            <p>
              Description of your work at The Royal Hospital for Women goes here. You can include details about your
              role, projects, and achievements.
            </p>
          </div>
        </div>

        <div className="project-row">
          <div className="project-card milkguard-card">
            <p>MilkGuard</p>
          </div>
          <div className="project-description">
            <h3>MilkGuard</h3>
            <p>
              Description of your work on MilkGuard goes here. You can include details about your role, projects, and
              achievements.
            </p>
          </div>
        </div>

        <div className="project-row">
          <div className="project-card personal-website-card">
            <p>Personal Website</p>
          </div>
          <div className="project-description">
            <h3>Personal Website</h3>
            <p>
              Description of your personal website project goes here. You can include details about the technologies
              used and features implemented.
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

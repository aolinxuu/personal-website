import React from "react";
import "./Work.css";

const Work = () => {
  const projects = [
    { id: 1, name: "OpenAI", logo: "path_to_openai_logo.png" },
    { id: 2, name: "The Royal Hospital for Women", logo: "path_to_royal_hospital_logo.png" },
    { id: 3, name: "MilkGuard", logo: "path_to_milkguard_logo.png" },
    { id: 4, name: "Personal Website", logo: "path_to_milkguard_logo.png" },
  ];
  return (
    <div className="work-container">
      <div className="work-title"> Technical Stuff</div>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.logo} alt={`${project.name} Logo`} className="project-image" />
            <p>{project.name}</p>
          </div>
        ))}
      </div>
      <div className="work-title"> Collaborations</div>
      <div className="work-title"> Workshops</div>
    </div>
  );
};

export default Work;

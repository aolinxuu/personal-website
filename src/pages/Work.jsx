import React from "react";
import "./Work.css";

const Work = () => {
  const projects = [
    { id: 1, name: "OpenAI", logo: "path_to_openai_logo.png" },
    { id: 2, name: "The Royal Hospital for Women", logo: "path_to_royal_hospital_logo.png" },
    { id: 3, name: "MilkGuard", logo: "path_to_milkguard_logo.png" },
  ];
  return (
    <div className="work-container">
      <div className="projects-title"> Technical Projects</div>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.logo} alt={`${project.name} Logo`} className="project-image" />
            <p>{project.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

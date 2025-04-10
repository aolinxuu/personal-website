import React from "react";
import "./Work.css";

const Work = () => {
  return (
    <div className="work-container">
      <div className="work-title">Technical Stuff</div>
      <div className="projects-container">
        <div className="project-row">
          <div className="project-card milk-card">
            <p>Milk Management System</p>
            <div className="tags-container">
              <div className="tag">Python</div>
              <div className="tag">HTML/CSS</div>
              <div className="tag">JavaScript</div>
              <div className="tag">PostgreSQL</div>
              <div className="tag">React</div>
              <div className="tag">Node.js</div>
            </div>
          </div>
          <div className="project-description">
            <p>
              An ongoing milk management and verification system for the Royal Hospital for Women to reduce human error
              and improve safety in neonatal feeding. Integrated barcode scanning to streamline milk tracking, enhance
              verification accuracy, and reduce reliance on manual checks by nurses.
            </p>
          </div>
        </div>
        <div className="project-row">
          <div className="project-card company-card">
            <p>Company Recommendation System</p>
            <div className="tags-container">
              <div className="tag">Python</div>
              <div className="tag">Machine Learning</div>
              <div className="tag">Recommender Systems</div>
              <div className="tag">Collaborative Filtering</div>
              <div className="tag">Content-Based Filtering</div>
              <div className="tag">Matrix Factorization</div>
            </div>
            <div className="links-container">
              <div className="github-link">
                <a href="https://github.com/EricHuynh10/comp9727-PeerCoRec">view on github</a>
              </div>
            </div>
          </div>
          <div className="project-description">
            <p>
              A peer company recommendation system for ASX-listed firms to enhance business analysis using collaborative
              filtering, content-based filtering, hybrid models and matrix factorization. Achieved a recall accuracy of
              0.3 comparable to ChatGPT 3.5 through hyperparameter tuning and cross-validation.
            </p>
          </div>
        </div>
        <div className="project-row">
          <div className="project-card study-timer-card">
            <p>LockIn - Study Timer</p>
            <div className="tags-container">
              <div className="tag">Python</div>
              <div className="tag">PyQt5</div>
            </div>
            <div className="links-container">
              <div className="github-link">
                <a href="https://github.com/aolinxuu/lock-in">view on github</a>
              </div>
              <div className="download-link">
                <a href="/LockIn.dmg">click to download my app</a>
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
      </div>
      {/* <div className="work-title"> Semi-Technical Stuff</div> */}
      {/* <div className="work-title"> Workshops</div>  */}
    </div>
  );
};

export default Work;

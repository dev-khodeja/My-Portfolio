import React from "react";

const Projects = () => (
  <section className="projects" id="projects">
    <h2>Projects</h2>
    <div className="project-list">
      <div className="project-card">
        <h3>Money Management App</h3>
        <p>A full-featured Money Management App built with the MERN stack for an organization named BMDSSS</p>
        <a href="https://bmdsss-savings.netlify.app/" target="_blank" rel="noopener noreferrer">View Live</a>
      </div>
      <div className="project-card">
        <h3>Dropshipping Platform</h3>
        <p>Scalable Dropshipping site with payment integration and admin dashboard for a company Dropupseller</p>
        <a href="https://dropupseller.com/" target="_blank" rel="noopener noreferrer">View Live</a>
      </div>
      <div className="project-card">
        <h3>IT company Website</h3>
        <p>This is a IT company site, built with React and styled for modern web for social sai a IT company n</p>
        <a href="https://socialsai.netlify.app/" target="_blank" rel="noopener noreferrer">View Live</a>
      </div>
    </div>
  </section>
);

export default Projects;

import React from "react";
import "../App.css";

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Hi, I'm khodeja Aktar</h1>
      <h2>MERN Stack Developer</h2>
      <p>I build scalable web applications using MongoDB, Express, React, and Node.js.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="#contact" className="btn-primary">Contact Me</a>
        <a href="/cv.pdf" className="btn-primary" download>Download CV</a>
      </div>
    </div>
  </section>
);

export default Hero;

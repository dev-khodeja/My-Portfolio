import React from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";


function App() {
	return (
		<div className="app-container">
			<Navbar />
			<div id="hero" className="fade-in-section delay-1"><Hero /></div>
			<div id="about" className="fade-in-section delay-2"><About /></div>
			<div id="skills" className="fade-in-section delay-3"><Skills /></div>
			<div id="projects" className="fade-in-section delay-4"><Projects /></div>
			<div id="contact" className="fade-in-section delay-5"><Contact /></div>
		</div>
	);
}

export default App;

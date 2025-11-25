import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Scanlines from './components/Scanlines';

// Main Portfolio Page
const Portfolio = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Scanlines Overlay */}
      <Scanlines />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

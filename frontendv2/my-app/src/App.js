import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">FlavourSync</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#explore" className="explore-button">Explore Flavours</a>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-text">
          <h2>Craft Your Culinary Journey</h2>
          <h1>Experience Food Like Never Before</h1>
          <p>Transform your cooking with personalized meal suggestions, ingredient alternatives, and sensory experiences tailored just for you.</p>
          <a href="#get-started" className="hero-button">Get Started</a>
        </div>
        <div className="hero-image">
          <img src="path_to_your_image.png" alt="Hero" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-text">
          <h2>Discover the FlavourSync Advantage</h2>
          <h1>About FlavourSync</h1>
          <p>FlavourSync is your ultimate culinary companion, seamlessly connecting flavours, health, and creativity. Our platform offers meal suggestions based on your preferences, health needs, and mood, making every meal unique and satisfying.</p>
          <a href="#explore" className="about-button">Explore Now</a>
        </div>
        <div className="about-image">
          <img src="path_to_your_image.png" alt="About" />
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="features">
        <h1>Key Features</h1>
        <div className="features-list">
          <div className="feature">
            <h3>Meal Suggestions</h3>
            <p>Recipes tailored for mood and health needs.</p>
          </div>
          <div className="feature">
            <h3>Health Suitability</h3>
            <p>Analyzes dietary compatibility with insights.</p>
          </div>
          <div className="feature">
            <h3>Ingredient Alternatives</h3>
            <p>Modern and historical swaps for creative cooking.</p>
          </div>
          <div className="feature">
            <h3>Sensory Experience</h3>
            <p>Enhances dining with music and ambiance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

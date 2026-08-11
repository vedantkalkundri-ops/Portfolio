import { useCallback, useState } from "react";
import MoltenMetal from "./components/MoltenMetal";
import PortfolioIntro from "./components/PortfolioIntro";
import "./App.css";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const handleMoveStart = useCallback(() => setShowBackground(true), []);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {showIntro && (
        <PortfolioIntro
          onMoveStart={handleMoveStart}
          onComplete={handleIntroComplete}
        />
      )}

      <div className={`portfolio-background${showBackground ? " is-visible" : ""}`} aria-hidden="true">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
        />
      </div>

      <main className="portfolio">
        <div className="portfolio-brand" aria-label="Portfolio">PORTFOLIO</div>
        <h1>Welcome to my portfolio</h1>

        <section id="about">
          <p>
            Hi, I'm Vedant. I'm a student interested in
            software development, AI and cybersecurity.
          </p>
        </section>
        <section id="skills" className="portfolio-section"><h2>Skills</h2></section>
        <section id="projects" className="portfolio-section"><h2>Projects</h2></section>
        <section id="contact" className="portfolio-section"><h2>Contact</h2></section>
      </main>
    </>
  );
}

export default App;

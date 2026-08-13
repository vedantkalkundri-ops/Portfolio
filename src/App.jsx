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
        <h1>Vedant Kalkundri</h1>
        <p className="portfolio-tagline">Code <span>|</span> Build <span>|</span> Evolve</p>
        <p className="portfolio-intro-line">
           A student developer working across full stack development,
          AI/ML, and cybersecurity. I like building things end to end — then
          figuring out how to make them better.
        </p>
       
      </main>
    </>
  );
}

export default App;

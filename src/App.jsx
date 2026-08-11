import { useState } from "react";
import MoltenMetal from "./components/MoltenMetal";
import PortfolioIntro from "./components/PortfolioIntro";
import "./App.css";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <PortfolioIntro
          onComplete={() => setShowIntro(false)}
        />
      )}

      {!showIntro && (
        <div className="portfolio-background" aria-hidden="true">
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
      )}

      <main className="portfolio">
        <div className="portfolio-brand" aria-label="Portfolio">
          PORTFOLIO
        </div>
        <h1>Welcome to my portfolio</h1>

        <p>
          Hi, I'm Vedant. I'm a student interested in
          software development, AI and cybersecurity.
        </p>
      </main>
    </>
  );
}

export default App;

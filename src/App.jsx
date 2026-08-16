import { useCallback, useState } from "react";
import MoltenMetal from "./components/MoltenMetal";
import Lanyard from "./components/Lanyard";
import PortfolioIntro from "./components/PortfolioIntro";
import SplitText from "./components/SplitText";
import DecryptedText from "./components/DecryptedText";
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

      <main className="portfolio portfolio--brand">
        <div className="portfolio-brand" aria-label="Portfolio">PORTFOLIO</div>
      </main>

        <a
          id="github-portfolio-link"
          className="github-link"
          href="https://github.com/vedantkalkundri-ops/Portfolio"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Vedant Kalkundri's GitHub repository"
        >
          <span className="github-link__label" aria-hidden="true">vedantkalkundri-ops</span>
          <svg className="github-link__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.531 2.865 8.375 6.839 9.73.5.096.683-.221.683-.493 0-.243-.009-.888-.014-1.744-2.782.62-3.369-1.374-3.369-1.374-.455-1.185-1.11-1.5-1.11-1.5-.908-.636.068-.623.068-.623 1.004.073 1.532 1.057 1.532 1.057.893 1.57 2.343 1.116 2.914.853.091-.666.349-1.117.635-1.374-2.221-.26-4.556-1.139-4.556-5.069 0-1.12.39-2.035 1.029-2.752-.103-.261-.446-1.306.098-2.723 0 0 .84-.277 2.75 1.051A9.33 9.33 0 0 1 12 6.89a9.3 9.3 0 0 1 2.504.348c1.909-1.328 2.747-1.051 2.747-1.051.546 1.417.203 2.462.1 2.723.64.717 1.027 1.632 1.027 2.752 0 3.94-2.339 4.806-4.568 5.061.359.32.678.95.678 1.915 0 1.383-.012 2.5-.012 2.84 0 .274.18.594.688.492C19.14 20.624 22 16.782 22 12.253 22 6.588 17.523 2 12 2Z" />
          </svg>
        </a>

      <main className="portfolio">
        <h1>
          <SplitText
            text="Vedant Kalkundri"
            start={!showIntro}
            delay={0.15}
            duration={0.8}
            stagger={0.04}
            animation="slide-up"
          />
        </h1>
        <p className="portfolio-tagline">
          <DecryptedText
            text="Code"
            start={!showIntro}
            decryptDelay={300}
            charRevealSpeed={40}
          />
          <span className="tagline-separator" style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.4s ease', transitionDelay: '0.5s' }}>|</span>
          <DecryptedText
            text="Build"
            start={!showIntro}
            decryptDelay={600}
            charRevealSpeed={40}
          />
          <span className="tagline-separator" style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.4s ease', transitionDelay: '0.8s' }}>|</span>
          <DecryptedText
            text="Evolve"
            start={!showIntro}
            decryptDelay={900}
            charRevealSpeed={40}
          />
        </p>
        
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} paused={showIntro} />

        <p className="portfolio-intro-line">
          <SplitText
            text="A student developer working across full stack development, AI/ML, and cybersecurity. I like building things end to end — then figuring out how to make them better."
            start={!showIntro}
            delay={0.5}
            duration={0.6}
            stagger={0.008}
            animation="blur-reveal"
          />
        </p>
       
      </main>
    </>
  );
}

export default App;

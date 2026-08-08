import { useState } from "react";
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

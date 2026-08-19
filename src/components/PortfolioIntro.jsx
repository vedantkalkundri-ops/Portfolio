import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PortfolioIntro.css";

function PortfolioIntro({ onComplete, onMoveStart }) {
  const introRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    const text = textRef.current;
    const targetInset = Math.min(40, Math.max(20, window.innerWidth * 0.03));
    const textBounds = text.getBoundingClientRect();
    const animatedTitle = text.querySelector(".intro-title");
    const persistentTitle = document.querySelector(".portfolio-brand");
    const animatedFontSize = Number.parseFloat(window.getComputedStyle(animatedTitle).fontSize);
    const persistentFontSize = Number.parseFloat(window.getComputedStyle(persistentTitle).fontSize);
    const finalScale = persistentFontSize / animatedFontSize;

    const timeline = gsap.timeline({
      onComplete: onComplete,
    });

    timeline
      // Wait a little so the user can see PORTFOLIO
      .to({}, { duration: 0.8 })

      // Move PORTFOLIO to top-left
      .to(text, {
        x: targetInset - textBounds.left,
        y: 20 - textBounds.top,
        scale: finalScale,
        duration: 1.2,
        ease: "power4.inOut",
        onStart: onMoveStart,
      })

      // Fade out the intro background
      .to(
        intro,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      timeline.kill();
    };
  }, [onComplete, onMoveStart]);

  return (
    <div ref={introRef} className="portfolio-intro">
      <div ref={textRef} className="portfolio-intro-text">
        <span className="intro-title">VK</span>
      </div>
    </div>
  );
}

export default PortfolioIntro;

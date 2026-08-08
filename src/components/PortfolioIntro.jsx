import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FoldText from "./FoldText";
import "./PortfolioIntro.css";

function PortfolioIntro({ onComplete }) {
  const introRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    const text = textRef.current;
    const targetInset = Math.min(40, Math.max(20, window.innerWidth * 0.03));
    const textBounds = text.getBoundingClientRect();
    const animatedTitle = text.querySelector(".fold-text");
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
  }, [onComplete]);

  return (
    <div ref={introRef} className="portfolio-intro">
      <div ref={textRef} className="portfolio-intro-text">
        <FoldText
          text="PORTFOLIO"
          splitBy="char"
          hinge="top"
          trigger="mount"
          duration={0.65}
          stagger={0.06}
          ease="power3.out"
          perspective={700}
          creaseShading={0.55}
          fontSize="clamp(4rem, 12vw, 10rem)"
          fontWeight={800}
          color="#f7f2e8"
        />
      </div>
    </div>
  );
}

export default PortfolioIntro;

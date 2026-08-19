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

    gsap.set(animatedTitle, { opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: onComplete,
    });

    timeline
      // Flicker 1: Off -> On -> Off
      .to(animatedTitle, { opacity: 1, duration: 0.07 })
      .to(animatedTitle, { opacity: 0.15, duration: 0.10 })
      // Flicker 2: Off -> On -> Off
      .to(animatedTitle, { opacity: 0.9, duration: 0.07 })
      .to(animatedTitle, { opacity: 0.15, duration: 0.10 })
      // Flicker 3: Off -> On (stable)
      .to(animatedTitle, { opacity: 1, duration: 0.15 })
      // Wait a little so the user can see VK fully on
      .to({}, { duration: 0.2 })

      // Move VK to top-left
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

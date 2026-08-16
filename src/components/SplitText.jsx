import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./SplitText.css";

export default function SplitText({
  text = "",
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  ease = "power4.out",
  start = true,
  animation = "slide-up", // slide-up, blur-reveal, fade
  onComplete,
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Split text into words and then characters
  const words = useMemo(() => {
    if (!text) return [];
    return text.split(" ").map((word, wordIndex) => {
      return {
        word,
        chars: Array.from(word),
        key: `word-${wordIndex}`,
      };
    });
  }, [text]);

  useEffect(() => {
    if (!start || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");
    if (!chars.length) return;

    // Reset properties before animation
    gsap.killTweensOf(chars);

    let fromVars = {};
    let toVars = {
      duration,
      stagger,
      ease,
      delay,
      onComplete,
    };

    if (animation === "slide-up") {
      fromVars = { y: "105%", opacity: 0 };
      toVars = { ...toVars, y: "0%", opacity: 1 };
    } else if (animation === "blur-reveal") {
      fromVars = { filter: "blur(12px)", opacity: 0, y: "15px" };
      toVars = { ...toVars, filter: "blur(0px)", opacity: 1, y: "0px" };
    } else {
      // default fade
      fromVars = { opacity: 0 };
      toVars = { ...toVars, opacity: 1 };
    }

    // Set initial state
    gsap.set(chars, fromVars);

    // Animate
    animationRef.current = gsap.to(chars, toVars);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [start, animation, delay, duration, stagger, ease, onComplete]);

  if (!text) return null;

  return (
    <span
      ref={containerRef}
      className={`split-text-container ${className} ${start ? "is-animating" : "is-hidden"}`}
      aria-label={text}
    >
      {words.map(({ word, chars, key }, wordIndex) => (
        <span key={key} className="split-word-wrapper">
          <span className="split-word">
            {chars.map((char, charIndex) => (
              <span
                key={`${key}-char-${charIndex}`}
                className="split-char-wrapper"
              >
                <span className="split-char">{char}</span>
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && (
            <span className="split-space-wrapper">
              <span className="split-char">&nbsp;</span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

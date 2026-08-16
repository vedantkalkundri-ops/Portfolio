import { useEffect, useRef, useState } from "react";
import "./DecryptedText.css";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[]\\;',./";

export default function DecryptedText({
  text = "",
  start = true,
  scrambleSpeed = 30, // milliseconds per scramble frame
  decryptDelay = 500,  // delay before starting decryption in ms
  charRevealSpeed = 40, // speed of revealing characters in ms
  hoverScramble = true,
  scrambleChars = DEFAULT_CHARS,
  className = "",
  style = {},
}) {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const triggerRef = useRef(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // If not started, reset to hidden or show empty
    if (!start) {
      setDisplayText("");
      triggerRef.current = false;
      return;
    }

    // If already triggered, don't restart unless hover changed
    if (triggerRef.current && !isHovered) return;

    triggerRef.current = true;

    // Clear any active timelines/timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const length = text.length;
    let revealedCount = 0;
    
    // Initialize display with scramble characters of matching length
    const initialScramble = Array.from({ length }, (_, i) => {
      if (text[i] === " ") return " ";
      if (text[i] === "|") return "|";
      return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }).join("");
    setDisplayText(initialScramble);

    // Delay before starting the decryption reveal
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) => {
          // Increment reveal count
          revealedCount += 1;
          
          if (revealedCount >= length) {
            clearInterval(intervalRef.current);
            return text;
          }

          return Array.from({ length }, (_, i) => {
            if (i < revealedCount) {
              return text[i];
            }
            if (text[i] === " ") return " ";
            if (text[i] === "|") return "|";
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }).join("");
        });
      }, charRevealSpeed);
    }, decryptDelay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, start, scrambleSpeed, decryptDelay, charRevealSpeed, scrambleChars, isHovered]);

  const handleMouseEnter = () => {
    if (hoverScramble && start) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverScramble && start) {
      setIsHovered(false);
    }
  };

  return (
    <span
      className={`decrypted-text ${className}`}
      style={{ ...style, opacity: start ? 1 : 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
}

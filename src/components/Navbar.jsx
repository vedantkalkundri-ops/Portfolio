import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const navItems = ["Home", "About", "Projects", "Experience", "Contact"];

export default function Navbar({ visible }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
      if (targetIndex !== null && itemRefs.current[targetIndex]) {
        const el = itemRefs.current[targetIndex];
        setSliderStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
        });
      } else {
        setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex, hoveredIndex]);

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index);
  };

  return (
    <nav className={`navbar-container${visible ? " is-visible" : ""}`} ref={containerRef}>
      <div className="navbar-pill">
        <div
          className="navbar-slider"
          style={{
            transform: `translateX(${sliderStyle.left}px)`,
            width: `${sliderStyle.width}px`,
            opacity: sliderStyle.opacity,
          }}
        />
        {navItems.map((item, index) => (
          <a
            key={item}
            ref={(el) => (itemRefs.current[index] = el)}
            href={`#${item.toLowerCase()}`}
            className={`navbar-link ${activeIndex === index ? "is-active" : ""}`}
            onClick={(e) => handleLinkClick(e, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

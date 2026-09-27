import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const navItems = ["Home", "About", "Education", "Skills", "Projects", "Contact"];

export default function Navbar({ visible }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  // Scroll spy to update active section link automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].toLowerCase());
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update slider position for desktop navigation
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

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index);
    setMobileMenuOpen(false);
    const targetSectionId = navItems[index].toLowerCase();
    const sectionElement = document.getElementById(targetSectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar-container${visible ? " is-visible" : ""}`} ref={containerRef}>
      {/* Desktop Navigation */}
      <div className="navbar-pill desktop-only">
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

      {/* Mobile Responsive 3-Lines Hamburger & Glassmorphic Menu */}
      <div className="mobile-only-wrapper">
        <button
          className={`mobile-hamburger-btn${mobileMenuOpen ? " is-open" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>

        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`mobile-menu-link ${activeIndex === index ? "is-active" : ""}`}
                onClick={(e) => handleLinkClick(e, index)}
              >
                <span className="mobile-link-dot"></span>
                <span className="mobile-link-text">{item}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}


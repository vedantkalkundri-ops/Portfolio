import { useCallback, useState } from "react";
import MoltenMetal from "./components/MoltenMetal";
import Lanyard from "./components/Lanyard";
import PortfolioIntro from "./components/PortfolioIntro";
import Navbar from "./components/Navbar";
import SideRays from "./components/SideRays";
import CardSwap, { Card } from "./components/CardSwap";
import StarBorder from "./components/StarBorder";
import Dock from "./components/Dock";
import AccordionGallery from "./components/AccordionGallery";
import { Code2, Database, Cpu, ShieldCheck, Briefcase } from "lucide-react";
import "./App.css";



const techItems = [
  { icon: <img src="/Python-Software-Foundation-Emblem.png" alt="Python" />, label: "Python" },
  { icon: <img src="/java-programming-language-java-logo-free-png.png" alt="Java" />, label: "Java" },
  { icon: <img src="/MySQL-Logo.wine.png" alt="MySQL" />, label: "MySQL" },
  { icon: <img src="/HTML5_logo.png" alt="HTML5" />, label: "HTML5" },
  { icon: <img src="/CSS-Logo-2011.png" alt="CSS3" />, label: "CSS3" },
  { icon: <img src="/JavaScript-Symbol.png" alt="JavaScript" />, label: "JavaScript" },
  { icon: <img src="/react.png" alt="React" />, label: "React" },
  { icon: <img src="/nodejs.png" alt="Node.js" />, label: "Node.js" },
  { icon: <img src="/php-logo-png-php-logo-png-white.png" alt="PHP" />, label: "PHP" },
  { icon: <img src="/Git_icon.svg.webp" alt="Git" />, label: "Git" }
];

const toolItems1 = [
  { icon: <img src="/vscode-logo.webp" alt="VSCode" />, label: "VSCode" },
  { icon: <img src="/Kali-dragon-icon.svg.webp" alt="Kali Linux" />, label: "Kali Linux" },
  { icon: <img src="/ubuntu.svg" alt="Ubuntu" />, label: "Ubuntu" },
  { icon: <img src="/BurpSuite_Comunity_Edition.svg.webp" alt="BurpSuite" />, label: "BurpSuite" },
  { icon: <img src="/zap.png" alt="OWASP ZAP" />, label: "OWASP ZAP" },
  { icon: <img src="/nmap-logo.png" alt="Nmap" />, label: "Nmap" },
  { icon: <img src="/Wireshark_icon_new.png" alt="Wireshark" />, label: "Wireshark" },
  { icon: <img src="/Adobe_Photoshop_CC_icon.svg.webp" alt="Photoshop" />, label: "Photoshop" },
  { icon: <img src="/figma.png" alt="Figma" />, label: "Figma" }
];

const toolItems2 = [
  { icon: <img src="/Canva-logo.png" alt="Canva" />, label: "Canva" },
  { icon: <img src="/gamma.png" alt="Gamma" />, label: "Gamma" },
  { icon: <img src="/new-ChatGPT-icon-white-png-large-size.png" alt="ChatGPT" />, label: "ChatGPT" },
  { icon: <img src="/Google_Gemini_icon_2025.svg.webp" alt="Gemini" />, label: "Gemini" },
  { icon: <img src="/claude_logo.jpeg" alt="Claude" />, label: "Claude" },
  { icon: <img src="/antigravity-icon__full-color.png" alt="Antigravity" />, label: "Antigravity" },
  { icon: <img src="/github-white-icon.webp" alt="GitHub" />, label: "GitHub" },
  { icon: <img src="/vercel.png" alt="Vercel" />, label: "Vercel" }
];

const projectItems = [
  {
    video: "/Sylvah Group _ Real Estate Company in Belagavi,Hubli & Dharwad - Google Chrome 2026-08-27 17-08-37.mp4",
    images: ["/Sylvah1.png", "/Sylvah2.png", "/Sylvah3.png", "/Sylvah4.png"],
    image: "/Sylvah1.png",
    label: "SYLVAH GROUP",
    descriptionLine1: "A real estate platform for discovering and managing properties.",
    descriptionLine2: "Simplifying property listings, inquiries, and administration in one place.",
    link: "#"
  },
  {
    video: "/SmartCampusNavigation&UtilityBot.mp4",
    images: ["/Smartcampusnavi1.png", "/Smartcampusnavi2.png", "/Smartcampusnavi3.png", "/Smartcampusnavi4.png", "/Smartcampusnavi5.png"],
    image: "/Smartcampusnavi1.png",
    label: "Smart Campus Navigation & Utility Bot",
    descriptionLine1: "A Smart Campus Bot helping students navigate the campus through Maps, Chatbot, and Utility Status.",
    descriptionLine2: "It simplifies communication and helps newcomers quickly find campus resources.",
    link: "#"
  },
  {
    video: "/Anusha Inamdar - Portfolio - Google Chrome 2026-08-27 17-33-36.mp4",
    images: ["/anushaInamdarPortfolio.png", "/anushaInamdarp2.png", "/anushaInamdarp3.png"],
    image: "/anushaInamdarPortfolio.png",
    label: "Anusha Inamdar Portfolio",
    descriptionLine1: "A personal portfolio showcasing her skills, projects, achievements,",
    descriptionLine2: "and professional journey.",
    link: "#"
  },
  {
    video: "/AURA_OS [Running] - Oracle VirtualBox 2026-08-27 17-02-43.mp4",
    images: ["/Auraos.png", "/Auraos2.png", "/Auraos3.png"],
    image: "/Auraos.png",
    label: "AURA OS",
    descriptionLine1: "An AI-powered Linux interface for smart system control and automation.",
    descriptionLine2: "Use AI and voice commands to interact with Linux effortlessly.",
    link: "#"
  },
  {
    video: "/ExcelSense.mp4",
    images: ["/ExcelSense1.png", "/ExcelSense2.png", "/Excelsense3.png"],
    image: "/ExcelSense1.png",
    label: "Smart ExcelSense",
    descriptionLine1: "An Excel assistant for data analysis, insights, and visualizations.",
    descriptionLine2: "Simplifies spreadsheets using natural language commands.",
    link: "#"
  }
];

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

      <div className="portfolio-brand" aria-label="Portfolio">VK</div>

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
      <Navbar visible={!showIntro} />

      {/* Section 1: Home (MoltenMetal Background) */}
      <section className="section-home" id="home">
        <div className={`portfolio-background${showBackground ? " is-visible" : ""}${!showIntro ? " no-transition" : ""}`} aria-hidden="true">
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

        <main className="portfolio">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} paused={showIntro} />

          <div className={`portfolio-bottom-section${!showIntro ? " is-visible" : ""}`}>
            <h1>Vedant Kalkundri</h1>
            <div className="portfolio-intro-line">
              A student developer working across full stack development, AI/ML, and cybersecurity. I like building things end to end — then figuring out how to make them better.
            </div>
            <div className="portfolio-static-title">
              PORTFOLIO
            </div>
          </div>
        </main>
      </section>

      {/* Section 2: About (SideRays Background) */}
      <section className="section-about" id="about">
        <div className="rays-background" aria-hidden="true">
          <SideRays
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={2.5}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1}
          />
        </div>

        <div className={`about-container${!showIntro ? " is-visible" : ""}`}>
          <div className="about-image-wrapper">
            <img
              src="/WhatsApp Image 2026-08-20 at 6.14.15 PM...png"
              alt="Vedant Kalkundri"
              className="about-image"
            />
          </div>

          <div className="about-text-content">
            <h2>About Me</h2>
            <h3 className="about-name">I'm Vedant Kalkundri</h3>
            <p>
              A third-year Information Science Engineering student passionate about software development, modern web technologies, artificial intelligence, and cybersecurity. I enjoy turning ideas into functional, engaging digital experiences while continuously exploring new technologies and building practical solutions.
            </p>
            <p>
              Beyond academics, I actively participate in technical events, hackathons, and collaborative projects that challenge me to learn and think creatively. I also serve as <strong>Sergeant-at-Arms at the Rotaract Club of KLS GIT</strong>, where I contribute to organizing activities, coordinating events, and working with a team to create meaningful experiences.
            </p>
            <p>
              I’m focused on growing as a developer through hands-on projects, competitions, leadership opportunities, and continuous learning. My goal is to build impactful technology, gain real-world experience, and keep challenging myself to become a better problem solver and developer.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2.5: Education & Achievements */}
      <section className="section-standard" id="education">
        <div className={`edu-ach-container${!showIntro ? " is-visible" : ""}`}>
          <div className="edu-ach-header">
            <h2 className="edu-ach-title">Foundation & Milestones</h2>
          </div>

          {/* Education Column (Left) */}
          <div className="edu-column">
            <h3 className="column-subtitle">Education</h3>
            <div className="timeline">
              <StarBorder as="div" className="edu-item-star-border" color="#9b4ceaff" speed="4s" thickness={1.5}>
                <div className="edu-logo-wrapper">
                  <img src="/kls_git_logo.webp" alt="KLS Gogte Institute of Technology" className="edu-logo" />
                </div>
                <div className="edu-content">
                  <span className="edu-date">Bachelor of Engineering</span>
                  <h3>KLS Gogte Institute of Technology, Belagavi</h3>
                  <p className="edu-degree">Information Science & Engineering</p>
                </div>
              </StarBorder>
              <StarBorder as="div" className="edu-item-star-border" color="#9b4ceaff" speed="4s" thickness={1.5}>
                <div className="edu-logo-wrapper">
                  <img src="/klsvpp.jpeg" alt="KLS Shri Vasantrao Potdar Polytechnic" className="edu-logo" />
                </div>
                <div className="edu-content">
                  <span className="edu-date">Diploma</span>
                  <h3>KLS Shri Vasantrao Potdar Polytechnic, Belagavi</h3>
                  <p className="edu-degree">Computer Science & Engineering</p>
                </div>
              </StarBorder>
              <StarBorder as="div" className="edu-item-star-border" color="#9b4ceaff" speed="4s" thickness={1.5}>
                <div className="edu-logo-wrapper">
                  <img src="/stpauls.png" alt="St Paul's High School" className="edu-logo" />
                </div>
                <div className="edu-content">
                  <span className="edu-date">Schooling</span>
                  <h3>St Paul's High School, Belagavi</h3>
                  <p className="edu-degree">Secondary Education / High Schooling</p>
                </div>
              </StarBorder>
            </div>
          </div>

          {/* Achievements Column (Right) */}
          <div className="ach-column">
            <h3 className="column-subtitle">Achievements</h3>
            <div className="achievements-list">
              <div className="ach-item">
                <div className="ach-bullet"></div>
                <div className="ach-content">
                  <h3>Won 2nd Prize</h3>
                  <span className="ach-org">Impactathon 2026 | Organized by Rotaract Club of GIT</span>
                  <p className="ach-project">Project: <strong>Smart Campus Navigation & Utility bot</strong></p>
                </div>
              </div>

              <div className="ach-item">
                <div className="ach-bullet"></div>
                <div className="ach-content">
                  <h3>Top 10 Finalist</h3>
                  <span className="ach-org">CODECLIPSE Hackathon | KLE Technological University, Belagavi</span>
                  <p className="ach-desc">Placed in the top 10 teams out of 250+ competing teams.</p>
                </div>
              </div>

              <div className="ach-item">
                <div className="ach-bullet"></div>
                <div className="ach-content">
                  <h3>Sergeant-at-Arms</h3>
                  <span className="ach-org">Rotaract Club of Gogte Institute of Technology (2026 - 2027)</span>
                  <p className="ach-desc">Elected leadership position managing administrative duties, coordination, and team dynamics.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: skills (CardSwap Showcase) */}
      <section className="section-standard" id="skills">
        <div className={`skills-container${!showIntro ? " is-visible" : ""}`}>
          <div className="skills-text-content">
            <h2>Skills</h2>
            <h3 className="skills-subtitle">Technology</h3>
            <Dock items={techItems} baseItemSize={60} magnification={80} />

            <h3 className="skills-subtitle">Software Tools</h3>
            <Dock items={toolItems1} baseItemSize={60} magnification={80} />
            <Dock items={toolItems2} baseItemSize={60} magnification={80} />
          </div>

          <div className="skills-visual-content">
            <CardSwap
              cardDistance={40}
              verticalDistance={40}
              delay={5000}
              pauseOnHover={false}
            >
              <Card>
                <div className="card-icon-container">
                  <Code2 size={36} strokeWidth={1.5} color="#c084fc" />
                </div>
                <h3>Full-Stack Development</h3>
                <p>Designing interactive user interfaces, building server-side functionality, and working with databases to create complete web applications.</p>
                <div className="card-skills-tags">
                  <span>Frontend</span>
                  <span>Backend</span>
                  <span>Database</span>
                </div>
              </Card>
              <Card>
                <div className="card-icon-container">
                  <Cpu size={36} strokeWidth={1.5} color="#c084fc" />
                </div>
                <h3>Exploring AI & Cybersecurity</h3>
                <p>Currently exploring artificial intelligence, generative AI, machine learning concepts, and cybersecurity to expand my technical knowledge.</p>
                <div className="card-skills-tags">
                  <span>AI/ML</span>
                  <span>Generative AI</span>
                  <span>LLMs</span>
                  <span>Cybersecurity</span>
                </div>
              </Card>
              <Card>
                <div className="card-icon-container">
                  <Briefcase size={36} strokeWidth={1.5} color="#c084fc" />
                </div>
                <h3>Freelance & Client Projects</h3>
                <p>Working on real-world projects, understanding client requirements, and delivering functional, high-quality solutions.</p>
                <div className="card-skills-tags">
                  <span>Real-World Projects</span>
                  <span>Client Requirements</span>
                  <span>Problem Solving</span>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* Section 4: Projects (Placeholder Section) */}
      <section className="section-standard" id="projects">
        <div className={`projects-container${!showIntro ? " is-visible" : ""}`}>
          <h2>Projects</h2>

          <AccordionGallery
            items={projectItems}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#ffffff"
            overlayColor="#060010"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={460}
            gap={10}
            radius={16}
            orientation="horizontal"
            videoPlaybackRate={1.75}
          />
        </div>
      </section>

      {/* Section 5: Contact (Placeholder Section) */}
      <section className="section-standard" id="contact">
        <div className={`section-content${!showIntro ? " is-visible" : ""}`} style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.8s ease-out 0.5s' }}>
          <h2>Contact</h2>
          <p>
            Feel free to reach out to discuss work opportunities, projects, or collaborations. You can find me on GitHub or send a message.
          </p>
        </div>
      </section>
    </>
  );
}

export default App;

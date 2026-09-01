import React, { useEffect, useState } from "react";
import { X, ExternalLink, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Play } from "lucide-react";
import "./ProjectModal.css";

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.531 2.865 8.375 6.839 9.73.5.096.683-.221.683-.493 0-.243-.009-.888-.014-1.744-2.782.62-3.369-1.374-3.369-1.374-.455-1.185-1.11-1.5-1.11-1.5-.908-.636.068-.623.068-.623 1.004.073 1.532 1.057 1.532 1.057.893 1.57 2.343 1.116 2.914.853.091-.666.349-1.117.635-1.374-2.221-.26-4.556-1.139-4.556-5.069 0-1.12.39-2.035 1.029-2.752-.103-.261-.446-1.306.098-2.723 0 0 .84-.277 2.75 1.051A9.33 9.33 0 0 1 12 6.89a9.3 9.3 0 0 1 2.504.348c1.909-1.328 2.747-1.051 2.747-1.051.546 1.417.203 2.462.1 2.723.64.717 1.027 1.632 1.027 2.752 0 3.94-2.339 4.806-4.568 5.061.359.32.678.95.678 1.915 0 1.383-.012 2.5-.012 2.84 0 .274.18.594.688.492C19.14 20.624 22 16.782 22 12.253 22 6.588 17.523 2 12 2Z" />
  </svg>
);

const ProjectModal = ({ project, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(!!project?.video);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!project) return null;

  const images = project.images || (project.image ? [project.image] : []);
  const features = project.features || [];
  const tags = project.tags || project.techStack || [];

  const handlePrev = () => {
    setShowVideo(false);
    setActiveMediaIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setShowVideo(false);
    setActiveMediaIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left / Top: Media Showcase */}
        <div className="project-modal-media-wrapper">
          <div className="project-modal-main-display">
            {showVideo && project.video ? (
              <video
                src={project.video}
                controls
                autoPlay
                muted
                className="project-modal-video"
              />
            ) : images.length > 0 ? (
              <img
                src={images[activeMediaIndex]}
                alt={`${project.label} preview ${activeMediaIndex + 1}`}
                className="project-modal-main-image"
              />
            ) : (
              <div className="project-modal-no-media">No Preview Available</div>
            )}

            {images.length > 1 && !showVideo && (
              <>
                <button className="media-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
                  <ChevronLeft size={22} />
                </button>
                <button className="media-nav-btn next" onClick={handleNext} aria-label="Next image">
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Media Switcher Thumbnails */}
          {(project.video || images.length > 1) && (
            <div className="project-modal-thumbnails">
              {project.video && (
                <button
                  className={`thumb-btn video-thumb ${showVideo ? "active" : ""}`}
                  onClick={() => setShowVideo(true)}
                  title="Watch Video Preview"
                >
                  <Play size={16} /> <span>Video</span>
                </button>
              )}
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${!showVideo && activeMediaIndex === idx ? "active" : ""}`}
                  onClick={() => {
                    setShowVideo(false);
                    setActiveMediaIndex(idx);
                  }}
                  title={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right / Bottom: Detailed Info */}
        <div className="project-modal-body">
          <div className="project-modal-header">
            <span className="project-modal-badge">
              <Sparkles size={14} /> Featured Project
            </span>
            <h2 id="modal-project-title" className="project-modal-title">
              {project.label}
            </h2>
          </div>

          <div className="project-modal-description">
            <h3>Overview</h3>
            <p>{project.detailedDescription || `${project.descriptionLine1} ${project.descriptionLine2 || ""}`}</p>
          </div>

          {features.length > 0 && (
            <div className="project-modal-features">
              <h3>Key Highlights</h3>
              <ul>
                {features.map((feature, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tags.length > 0 && (
            <div className="project-modal-tags-section">
              <h3>Tech & Tools</h3>
              <div className="project-modal-tags">
                {tags.map((tag, i) => (
                  <span key={i} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="project-modal-actions">
            {project.link && project.link !== "#" && !project.link.startsWith("Your ") && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-action-btn primary"
              >
                <ExternalLink size={18} /> View Live Project
              </a>
            )}
            {project.github && project.github !== "#" && !project.github.startsWith("Your ") && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-action-btn secondary"
              >
                <GithubIcon size={18} /> Source Code
              </a>
            )}
            <button onClick={onClose} className="modal-action-btn outline">
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

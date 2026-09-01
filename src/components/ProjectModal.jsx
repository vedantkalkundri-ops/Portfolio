import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";
import "./ProjectModal.css";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.531 2.865 8.375 6.839 9.73.5.096.683-.221.683-.493 0-.243-.009-.888-.014-1.744-2.782.62-3.369-1.374-3.369-1.374-.455-1.185-1.11-1.5-1.11-1.5-.908-.636.068-.623.068-.623 1.004.073 1.532 1.057 1.532 1.057.893 1.57 2.343 1.116 2.914.853.091-.666.349-1.117.635-1.374-2.221-.26-4.556-1.139-4.556-5.069 0-1.12.39-2.035 1.029-2.752-.103-.261-.446-1.306.098-2.723 0 0 .84-.277 2.75 1.051A9.33 9.33 0 0 1 12 6.89a9.3 9.3 0 0 1 2.504.348c1.909-1.328 2.747-1.051 2.747-1.051.546 1.417.203 2.462.1 2.723.64.717 1.027 1.632 1.027 2.752 0 3.94-2.339 4.806-4.568 5.061.359.32.678.95.678 1.915 0 1.383-.012 2.5-.012 2.84 0 .274.18.594.688.492C19.14 20.624 22 16.782 22 12.253 22 6.588 17.523 2 12 2Z" />
  </svg>
);

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.toLowerCase().includes('your live') || trimmed.toLowerCase().includes('your github')) return false;
  return true;
};

const ProjectModal = ({ project, onClose }) => {
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

  const hasLiveLink = isValidUrl(project.link);
  const hasGithubLink = isValidUrl(project.github);

  const modalContent = (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <h2 id="modal-project-title" className="project-modal-title">
          {project.label}
        </h2>

        <div className="project-modal-section">
          <h3 className="project-modal-section-title">About</h3>
          <p className="project-modal-about">
            {project.detailedDescription || `${project.descriptionLine1 || ""} ${project.descriptionLine2 || ""}`}
          </p>
        </div>

        <div className="project-modal-links">
          <div className="project-modal-link-item">
            <span className="link-label">Live Link :</span>{" "}
            {hasLiveLink ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-anchor"
              >
                {project.link} <ExternalLink size={14} />
              </a>
            ) : (
              <span className="link-placeholder">Your live/demo link</span>
            )}
          </div>

          <div className="project-modal-link-item">
            <span className="link-label">
              <GithubIcon size={20} /> Link :
            </span>{" "}
            {hasGithubLink ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-anchor"
              >
                {project.github} <ExternalLink size={14} />
              </a>
            ) : (
              <span className="link-placeholder">Your GitHub link</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;

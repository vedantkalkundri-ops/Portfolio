import React, { useState, useRef } from 'react';
import { User, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import './contactform.css';

const LinkedinIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const GithubIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.531 2.865 8.375 6.839 9.73.5.096.683-.221.683-.493 0-.243-.009-.888-.014-1.744-2.782.62-3.369-1.374-3.369-1.374-.455-1.185-1.11-1.5-1.11-1.5-.908-.636.068-.623.068-.623 1.004.073 1.532 1.057 1.532 1.057.893 1.57 2.343 1.116 2.914.853.091-.666.349-1.117.635-1.374-2.221-.26-4.556-1.139-4.556-5.069 0-1.12.39-2.035 1.029-2.752-.103-.261-.446-1.306.098-2.723 0 0 .84-.277 2.75 1.051A9.33 9.33 0 0 1 12 6.89a9.3 9.3 0 0 1 2.504.348c1.909-1.328 2.747-1.051 2.747-1.051.546 1.417.203 2.462.1 2.723.64.717 1.027 1.632 1.027 2.752 0 3.94-2.339 4.806-4.568 5.061.359.32.678.95.678 1.915 0 1.383-.012 2.5-.012 2.84 0 .274.18.594.688.492C19.14 20.624 22 16.782 22 12.253 22 6.588 17.523 2 12 2Z" />
    </svg>
);

const ContactForm = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate sending message
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    const handleReset = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="contact-wrapper">
            {/* Left Column: Form */}
            <div className="contact-card">
                <div className="contact-header">
                    <h3 className="contact-title">Get in Touch</h3>
                    <p className="contact-subtitle">
                        Have a project in mind or want to connect? Send me a message!
                    </p>
                    <div className="contact-underline"></div>
                </div>

                {isSubmitted ? (
                    <div className="success-message">
                        <CheckCircle2 className="success-icon" size={44} />
                        <h4>Message Sent Successfully!</h4>
                        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                        <button className="reset-btn" onClick={handleReset}>
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    <User size={15} />
                                    <span>Name</span>
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    <Mail size={15} />
                                    <span>Email</span>
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                <MessageSquare size={15} />
                                <span>Message</span>
                            </label>
                            <div className="input-wrapper">
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    rows={3}
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="submit-container">
                            <button
                                type="submit"
                                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                <Send size={16} className="send-icon" />
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Right Column: Free Open Text & Direct Links */}
            <div className="contact-info-card free-open">
                <div className="open-hero-content">
                    <div className="open-hero-title">
                        Let's build something together.
                    </div>
                    <div className="open-hero-subtitle">
                        Open to internships, collaborations, and opportunities to build meaningful things together.
                    </div>

                    <div className="open-social-row">
                        <a
                            href="https://linkedin.com/in/vedant-kalkundri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="open-social-text-link"
                        >
                            <LinkedinIcon />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://github.com/vedantkalkundri-ops"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="open-social-text-link"
                        >
                            <GithubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <a
                        href="mailto:vedantkalkundri@gmail.com"
                        className="open-email-text-link"
                    >
                        <Mail size={18} className="email-icon" />
                        <span>vedantkalkundri@gmail.com</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;


import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Toast = ({ message, type, onClose }) => (
  <div className={`toast toast--${type}`} role="alert">
    <span className="toast-icon">{type === "success" ? "✓" : "✕"}</span>
    <p className="toast-message">{message}</p>
    <button className="toast-close" onClick={onClose} aria-label="Dismiss">×</button>
  </div>
);

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      // Note: For Vite projects, use import.meta.env.VITE_* instead of process.env.REACT_APP_*
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_AUTOREPLY_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );

      showToast("Message sent! I'll be in touch soon 🎉", "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      showToast("Couldn't send your message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: "name", label: "Your name", type: "text", multiline: false },
    { name: "email", label: "Email address", type: "email", multiline: false },
    { name: "message", label: "What's on your mind?", type: "text", multiline: true },
  ];

  return (
    <main className="contact page-wrapper">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="contact-layout stagger">
        {/* Left panel */}
        <div className="contact-info">
          <p className="contact-eyebrow">Get in touch</p>
          <h1 className="contact-heading">
            Let's build something{" "}
            <em className="contact-heading-em">together.</em>
          </h1>
          <p className="contact-body">
            Whether it's a project collab, a speaking gig, a catch-up over coffee, 
            or just saying hi — I'd love to hear from you.
          </p>

          <div className="contact-links">
            <a href="mailto:aolinxu@gmail.com" className="contact-link">
              <span className="contact-link-icon">✉</span>
              <span>aolinxu@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/aolin-xu-b01798194/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-icon">in</span>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/aolinxuu" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </span>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Form panel */}
        <form className="contact-form" onSubmit={handleSubmit} ref={formRef} noValidate>
          {fields.map(({ name, label, type, multiline }) => (
            <div
              key={name}
              className={`form-field ${focusedField === name ? "form-field--focused" : ""} ${formData[name] ? "form-field--filled" : ""}`}
            >
              <label className="form-label" htmlFor={name}>{label}</label>
              {multiline ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="form-input form-textarea"
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="form-input"
                />
              )}
              <div className="form-underline" />
            </div>
          ))}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            {!isSubmitting && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
            {isSubmitting && <span className="spinner" />}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
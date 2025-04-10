import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const PopupMessage = ({ message, type, onClose }) => {
  return (
    <div className={`popup-message ${type}`}>
      <div className="popup-content">
        <span className="popup-text">{message}</span>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      // 1. Send to yourself
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY
      );

      // 2. Send auto-reply to sender
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_AUTOREPLY_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY
      );

      showPopup("Message sent successfully! I'll get back to you soon.", "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log("Sending with:", {
        service: process.env.REACT_APP_SERVICE_ID,
        template: process.env.REACT_APP_TEMPLATE_ID,
        publicKey: process.env.REACT_APP_PUBLIC_KEY,
      });

      const templateParams = {
        name: formData.name,
        email: formData.email,
      };

      console.log("templateParams:", templateParams);

      showPopup("Failed to send message. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {popup.show && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: "", type: "" })}
        />
      )}
      <div className="row input-container">
        <h4 style={{ textAlign: "left", width: "100%" }}>
          Let's connect, collab, catch-up, innovate <span style={{ fontWeight: "600" }}>together!</span>
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="col-md-6 col-sm-12">
            <div className="styled-input">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              <label>Name</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="styled-input" style={{ float: "right" }}>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              <label>Email</label>
            </div>
          </div>
          <div className="col-xs-12">
            <div className="styled-input wide">
              <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
              <label>Message</label>
            </div>
          </div>
          <div className="col-xs-12">
            <button type="submit" className="btn-lrg submit-btn" style={{ float: "left" }} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

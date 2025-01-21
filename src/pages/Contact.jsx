import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Thank you for contacting us!");
  };

  return (
    <div className="container">
      <div className="row input-container">
        {/* <div className="row"> */}
        <h4 style={{ textAlign: "left", width: "100%" }}>
          Let’s connect, collab, catch-up, innovate <span style={{ fontWeight: "600" }}>together!</span>
        </h4>

        {/* </div> */}
        {/* <div className="row input-container"> */}
        <div className="col-md-6 col-sm-12">
          <div className="styled-input">
            <input type="text" required />
            <label>Name</label>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="styled-input" style={{ float: "right" }}>
            <input type="text" required />
            <label>Email</label>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="styled-input wide">
            <textarea required></textarea>
            <label>Message</label>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="btn-lrg submit-btn" style={{ float: "left" }}>
            Send Message
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// return (
//   <div className="contact-container">
//     <div className="contact-form">
//       <p className="contact-title">Let’s connect, collab, catch-up, innovate... together</p>
//       <div className="contact-fields">
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} />
//           <div className="button-container">
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );

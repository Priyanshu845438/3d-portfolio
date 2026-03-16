import "./Contact.css";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">

        {/* LEFT: Text Content */}
        <div className="contact-left">
          <div className="contact-status-row">
            <span className="contact-available">
              <span className="contact-dot"></span>
              Available for Work
            </span>
            <a href="mailto:priyanshubth6742@gmail.com" className="contact-connect-btn">
              CONNECT
            </a>
          </div>

          <h2 className="section-heading">Let's Work<br />Together</h2>
          <div className="contact-divider"></div>

          <p className="contact-desc">
            I'm currently open to full-time roles, strategic freelance
            partnerships, and remote opportunities. If you're looking for a
            technical all-rounder who can bridge the gap between
            engineering, quality, and AI, I'd love to hear from you.
          </p>
        </div>

        {/* RIGHT: Contact Cards */}
        <div className="contact-right">
          <a href="mailto:priyanshubth6742@gmail.com" className="contact-card" data-cursor="disable">
            <div className="contact-card-icon email-icon">
              <MdEmail size={20} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">DIRECT EMAIL</span>
              <span className="contact-card-value">priyanshubth6742@gmail.com</span>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/priyanshu-raj-b0b589203" target="_blank" rel="noreferrer" className="contact-card" data-cursor="disable">
            <div className="contact-card-icon linkedin-icon">
              <FaLinkedinIn size={18} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">PROFESSIONAL NETWORK</span>
              <span className="contact-card-value">LinkedIn Profile</span>
            </div>
          </a>

          <a href="https://wa.me/916206698170" target="_blank" rel="noreferrer" className="contact-card" data-cursor="disable">
            <div className="contact-card-icon whatsapp-icon">
              <FaWhatsapp size={20} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">INSTANT MESSAGE</span>
              <span className="contact-card-value">+91-6206698170</span>
            </div>
          </a>

          <a href="https://github.com/Priyanshu845438" target="_blank" rel="noreferrer" className="contact-card" data-cursor="disable">
            <div className="contact-card-icon github-icon">
              <FaGithub size={20} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">CODEBASE</span>
              <span className="contact-card-value">Priyanshu845438</span>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;

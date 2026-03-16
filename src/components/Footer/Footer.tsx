import "./Footer.css";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="footer">
            {/* Left: Name + Roles */}
            <div className="footer-left">
                <span className="footer-name">Priyanshu Raj</span>
                <span className="footer-roles">Data Engineer &middot; AI Systems Quality &middot; Backend Developer</span>
            </div>

            {/* Center: Icon buttons */}
            <div className="footer-icons">
                <a href="https://github.com/Priyanshu845438" target="_blank" rel="noreferrer" className="footer-icon-btn" aria-label="GitHub" data-cursor="disable">
                    <FaGithub size={16} />
                </a>
                <a href="https://www.linkedin.com/in/priyanshu-raj-b0b589203" target="_blank" rel="noreferrer" className="footer-icon-btn" aria-label="LinkedIn" data-cursor="disable">
                    <FaLinkedinIn size={16} />
                </a>
                <a href="https://wa.me/916206698170" target="_blank" rel="noreferrer" className="footer-icon-btn" aria-label="WhatsApp" data-cursor="disable">
                    <FaWhatsapp size={16} />
                </a>
                <a href="mailto:priyanshubth6742@gmail.com" className="footer-icon-btn" aria-label="Email" data-cursor="disable">
                    <MdEmail size={17} />
                </a>
                <a href="tel:+916206698170" className="footer-icon-btn" aria-label="Phone" data-cursor="disable">
                    <FaPhone size={14} />
                </a>
            </div>

            {/* Right: Copyright + Location */}
            <div className="footer-right">
                <span>© 2026 Priyanshu Raj &middot; Gujarat, India</span>
            </div>
        </footer>
    );
};

export default Footer;

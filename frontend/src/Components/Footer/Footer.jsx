import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo.png";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaPinterest 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            <div className="footer_logo_container">
              <img src={logo} alt="" loading="lazy" />
            </div>

            <div className="footer_address">
            <p className="footer_label">Address</p>
            <span className="footer_label_contnet">Vidhyadhar Nagar, Jaipur</span>
            </div>
            <div className="footerContactShort">
              <p className="footer_label">Contact Us</p>
              <div className="contact_item">
              <HiPhone/>
              <span className="footer_label_contnet"> +91 12345 12345 </span>
              </div>
              <div className="contact_item">
              <MdEmail/>
              <a className="footer_label_contnet" href="mailto:contact@apnidukaan.com">Email Support</a>
              </div>
            </div>
          </div>

          <div className="footer_content">
            <h5>Company</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Shop</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/shop">New Arrivals</Link>
                </li>
                <li>
                  <Link to="/shop">Accessories</Link>
                </li>
                <li>
                  <Link to="/shop">Men</Link>
                </li>
                <li>
                  <Link to="/shop">Women</Link>
                </li>
                <li>
                  <Link to="/shop">Shop All</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Help</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/contact">Customer Service</Link>
                </li>
                <li>
                  <Link to="/loginSignUp">My Account</Link>
                </li>
                <li>
                  <Link to="/contact">Find a Store</Link>
                </li>
                <li>
                  <Link to="/terms">Legal & Privacy</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_right">
            <h5>Subscribe</h5>
            <p>
              Stay ahead with the latest offers, new arrivals, and smart shopping tips from Apni Dukaan!
            </p>
            <p>Need help? Reach out directly:</p>

            <form onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>


          </div>
        </div>
        <div className="footer_bottom">
            <div className="social_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          <p>
            © {getCurrentYear()} Apni Dukaan. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

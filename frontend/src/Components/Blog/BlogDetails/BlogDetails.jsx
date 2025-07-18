import React from "react";

import "./BlogDetails.css";

import blogdetail1 from "../../../Assets/Blog/blogDetail1.jpg";
import blogimage1 from "../../../Assets/Blog/blogDetail2.jpg";
import blogimage2 from "../../../Assets/Blog/blogDetail3.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const BlogDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="blogDetailsSection">
        <div className="blogDetailsSectionContainer">
          <div className="blogDetailsHeading">
            <h2>5 Tips to Increase Your Online Sales</h2>
            <div className="blogDetailsMetaData">
              <span>by admin</span>
              <span>July 16, 2025</span>
              <span>Trends</span>
            </div>
          </div>

          <div className="blogDetailsContent">
            <h5>Welcome to Apni Dukaan Blogs</h5>
            <p>
              At Apni Dukaan, we believe shopping should be simple, affordable, and enjoyable. That’s why our blog exists — to help you discover new trends, shop smarter, and make informed choices whether you're buying fashion, electronics, kitchen essentials, or daily-use products.
            </p>

            <p>
              In today's fast-paced digital world, understanding your customer and providing a seamless shopping experience is key to increasing online sales. Whether you're a small business owner, a seller on our platform, or a curious reader — these tips will help you grow and thrive in the e-commerce space.
            </p>

            <h5>Why Apni Dukaan?</h5>
            <p>
              We serve customers across India — from metro cities to rural towns — ensuring that quality and convenience reach everyone. Our platform is designed to support easy navigation, smooth checkout, and reliable delivery backed by customer trust.
              At Apni Dukaan, we believe online shopping should be more than just convenient — it should be trustworthy, affordable, and tailored to your needs. Whether you’re browsing for daily essentials, upgrading your wardrobe, or looking for something special for your home, our goal is to make your experience smooth, reliable, and enjoyable. Through this blog, we aim to share valuable insights that help you shop smarter, discover trending products, and make informed buying decisions.
              Every blog we publish is written with our users in mind — to inspire, educate, and guide you through your shopping journey. Whether it’s a product review, a festival shopping guide, or simple tips to make the most of your order, we want this space to be useful and relevant for you. Your trust and satisfaction are at the heart of what we do, and we’re excited to keep growing with your support.
            </p>
          </div>

          <div className="blogDetailsContent">
            <p>
              Our mission is to make online shopping feel like your trusted local store — friendly, fast, and fair. From detailed product listings to verified reviews and helpful return policies, we aim to build long-term relationships with our customers, not just one-time sales.
            </p>
            <p>
              Stay tuned to our blog space as we continue to share shopping inspiration, product launches, festival season deals, and helpful tips to make your Apni Dukaan experience even better.
            </p>
          </div>

          <div className="blogDetailsContentImg">
            <img src={blogimage1} alt="blog detail" loading="lazy" />
            <img src={blogimage2} alt="blog detail" loading="lazy" />
          </div>

          <div className="blogDetailsContent">
            <p>
              Thanks for being a part of our journey. Whether you're a customer, seller, or first-time visitor — we welcome you to the Apni Dukaan family. Let’s shop smarter, support local, and grow together in the world of online commerce.
            </p>
            <p>
              For more blogs like this, keep browsing and don’t forget to follow us on social media for daily tips and trending product updates!
            </p>
          </div>

          <div className="blogDetailsNextPrev">
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon"
                onClick={scrollToTop}
              >
                <GoChevronLeft size={20} />
                <p>PREVIOUS POST</p>
              </div>
              <p>Why Apni Dukaan is the Best Choice for Small Town Shoppers</p>
            </div>
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon2"
                onClick={scrollToTop}
              >
                <p>NEXT POST</p>
                <GoChevronRight size={20} />
              </div>
              <p style={{ textAlign: "right" }}>
                2025 Summer Fashion Trends – Affordable Looks on Apni Dukaan
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
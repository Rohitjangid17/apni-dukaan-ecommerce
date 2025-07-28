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
          <div className="blogDetailsContentImg">
            <img src={blogimage1} alt="blog detail" loading="lazy" />
            <img src={blogimage2} alt="blog detail" loading="lazy" />
          </div>
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
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
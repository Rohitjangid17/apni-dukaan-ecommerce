import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const backgroundImages = [
  require("../../../Assets/slideshow-pattern-images/1.jpeg"),
  require("../../../Assets/slideshow-pattern-images/2.jpeg"),
  require("../../../Assets/slideshow-pattern-images/3.jpeg"),
  require("../../../Assets/slideshow-pattern-images/4.jpeg"),
  require("../../../Assets/slideshow-pattern-images/5.jpeg"),
  require("../../../Assets/slideshow-pattern-images/6.jpeg"),
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
        setFadeIn(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="heroMainWrapper">
      <div
        className={`heroMain ${fadeIn ? "fade-in" : "fade-out"}`}
        style={{
          backgroundImage: `url(${backgroundImages[currentImage]})`,
        }}
      >
        <div className="sectionleft">
          <p>Best Deals</p>
          <h1>Apni Dukaan Mega Sale</h1>
          <span>Shop Smart – Save Big! Up to 70% Off on Top Picks</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Start Shopping</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
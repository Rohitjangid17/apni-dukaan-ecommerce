import React from "react";
import "./AboutPage.css";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>About Us</h2>
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>
            Welcome to Apni Dukaan, your trusted one-stop destination for everything from daily household items to the latest lifestyle upgrades — all delivered with convenience, quality, and care. In today’s fast-paced world, where time is valuable and choices are endless, we set out on a mission to simplify shopping for every Indian household. Apni Dukaan was born with a simple yet powerful vision: to make online shopping easy, affordable, and truly reliable for everyone, whether you live in a metro city, a small town, or a rural village.

          </h4>
          <p>
            We believe that everyone deserves access to high-quality products without overpaying or going through a frustrating shopping process. That’s why we’ve designed our platform to cater to the real needs of real people. From affordable gadgets to everyday groceries, from trendy fashion to home essentials — Apni Dukaan brings together a wide range of carefully curated categories under one virtual roof. Our products come directly from trusted vendors and verified sellers, and we emphasize quality control to ensure that what you see is what you get. No surprises — just satisfaction.

            <br/>
            <br/>

            Our team is a group of passionate professionals, developers, and customer service champions who work round the clock to make sure your experience with us is smooth, transparent, and hassle-free. We constantly update our inventory based on trends and customer feedback, so you always have access to the latest and most useful products. We are driven by technology but rooted in Indian values — honesty, respect, and personal touch. Whether you’re a student ordering hostel essentials, a working parent managing a household, or someone looking to gift your loved ones something special — Apni Dukaan is made for you.

          </p>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Our Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" loading="lazy" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;

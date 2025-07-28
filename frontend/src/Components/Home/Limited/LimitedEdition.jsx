import React, { useState, useEffect } from "react";
import "./LimitedEdition.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BASE_URL from "../../../constants/apiConfig";

import Spinner from "../../Spinner/Spinner";
import useAddToCart from "../../../hooks/useAddToCart";
import useProducts from "../../../hooks/useProducts";
import RenderStars from "../../../Utils/RenderStars";


const LimitedEdition = () => {
  const addToCartHandler = useAddToCart();
  const { products, loading } = useProducts();
  const limitedProducts = products.slice(0, 8);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Elite <span>Collection</span>
        </h2>
        <div className="limitedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          {loading ? (
              <div className="limitedSpinnerWrapper">
                <Spinner />
              </div>
            ) : (
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}
          >
    
            {limitedProducts.map((product) => {
              return (
                <SwiperSlide key={product.productId}>
                  <div className="lpContainer">
                    <div className="lpImageContainer">
                      <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
                        {product.images && product.images.length > 0 && (
                          <img
                            src={`${BASE_URL}${product.images[0]}`}
                            loading="lazy"
                            className="sdProduct_front"
                            alt="product image"
                          />
                        )}
                      </Link>
                      <h4 onClick={() => addToCartHandler(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div className="limitedProductInfo">
                      <div className="lpCategoryWishlist">
                        <p>{product.category?.name || 'Apparel'}</p>
                      </div>
                      <div className="productNameInfo">
                        <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
                          <h5>{product.name}</h5>
                        </Link>
                        <p>₹{product.price}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
                          {RenderStars(product.rating || 4.3)}
                          </div>
                          <span>{product.productReviews}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

export default LimitedEdition;

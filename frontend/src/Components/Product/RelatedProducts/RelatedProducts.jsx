import React from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BASE_URL from "../../../constants/apiConfig";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import useProducts from "../../../hooks/useProducts";
import RenderStars from "../../../Utils/RenderStars";


const RelatedProducts = () => {
    const navigate = useNavigate()
    const {products, loading} = useProducts();
    const relatedProducts = products.slice(0, 8);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const handleNavigate = (productId) => {
      navigate(`/product/${productId}`);
        scrollToTop();
    };

  return (
    <>
      <div className="relatedProductSection">
        <div className="relatedProducts">
          <h2>
            RELATED <span>PRODUCTS</span>
          </h2>
        </div>
        <div className="relatedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          {loading ? (
                <Spinner />
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
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
              },
            }}
          >
            {relatedProducts.map((product) => {
              return (
                <SwiperSlide key={product.productId}>
                  <div className="rpContainer">
                    <div className="rpImages">
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
                      <h4 onClick={() => handleNavigate(product.productId)}>Select Options</h4>
                    </div>

                    <div className="relatedProductInfo">
                      <div className="rpCategoryWishlist">
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

export default RelatedProducts;

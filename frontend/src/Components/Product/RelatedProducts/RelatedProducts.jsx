import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BASE_URL from "../../../constants/apiConfig";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import useAddToCart from "../../../hooks/useAddToCart";


const RelatedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const addToCartHandler = useAddToCart();

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${BASE_URL}/products/`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, []);

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
            {products.slice(0, 8).map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <div className="rpContainer">
                    <div className="rpImages">
                      <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                      {product.images?.[0] && (
                      <img
                        src={`${BASE_URL}${product.images[0]}`}
                        alt={product.name}
                        loading="lazy"
                        className="rpFrontImg"
                      />
                      )}
                      </Link>
                      <h4 onClick={() => addToCartHandler(product)}>Add to Cart</h4>
                    </div>

                    <div className="relatedProductInfo">
                      <div className="rpCategoryWishlist">
                        <p>{product.name}</p>
                      </div>
                      <div className="productNameInfo">
                        <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                        <h5>{product.description}</h5>
                        </Link>
                        <p>₹{product.price}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>

                          <span>0 reviews</span>
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

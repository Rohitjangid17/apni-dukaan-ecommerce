import React, { useState, useEffect } from "react";
import "./LimitedEdition.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BASE_URL from "../../../constants/apiConfig";

import toast from "react-hot-toast";
import Spinner from "../../Spinner/Spinner";


const LimitedEdition = () => {
  const dispatch = useDispatch();
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products
    const fetchLimitedProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/products/`);
        const data = await res.json();

        setLimitedProducts(data);
      } catch (err) {
          toast.error("Failed to fetch limited products", {
          duration: 2000,
          style: {
            backgroundColor: "#ff4b4b",
            color: "white",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ff4b4b",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLimitedProducts();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productId === product.id
    );
    
    console.log("productInCart", productInCart);

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Limited <span>Edition</span>
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
                <SwiperSlide key={product.id}>
                  <div className="lpContainer">
                    <div className="lpImageContainer">
                      <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                        <img
                          src={`${BASE_URL}${product.images?.[0]}`}
                          alt={product.name}
                          loading="lazy"
                          className="lpImage"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="lpProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                    </div>
                    <div className="limitedProductInfo">
                      <div className="lpCategoryWishlist">
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

                          <span>10k reviews</span>
                         
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

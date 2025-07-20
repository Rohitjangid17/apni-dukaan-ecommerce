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
import { FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import BASE_URL from "../../../constants/apiConfig";

import toast from "react-hot-toast";
import Spinner from "../../Spinner/Spinner";

// Function to render stars based on rating
const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#FEC78A" size={10} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#FEC78A" size={10} />);
    } else {
      stars.push(<FaRegStar key={i} color="#FEC78A" size={10} />);
    }
  }

  return stars;
};

const LimitedEdition = () => {
  const dispatch = useDispatch();
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake review data
  const fakeReviewList = [
  "4.8k+ reviews", "3.5k+ reviews", "5.1k+ reviews", "2.2k+ reviews", "4.1k+ reviews",
  "1.9k+ reviews", "3.8k+ reviews", "3.1k+ reviews", "2.5k+ reviews", "4.9k+ reviews",
  "1.1k+ reviews", "2.9k+ reviews", "1.4k+ reviews", "3.6k+ reviews", "2.0k+ reviews"
  ];

  useEffect(() => {
    // Fetch products
    const fetchLimitedProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/products/`);
        const data = await res.json();

        // Map products to include fake reviews and ratings
        const limited = data.slice(0, 5).map((product, index) => ({
          ...product,
          productReviews: fakeReviewList[index % fakeReviewList.length],
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 - 5.0
        }));

        setLimitedProducts(limited);
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
      (item) => item.productID === product.productID
    );

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
            {loading ? (
              <Spinner />
            ) : (
            limitedProducts.map((product) => {
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
                            {renderStars(product.rating || 4.5)}
                          </div>

                          <span>{product.productReviews}</span>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LimitedEdition;

import React, { useState, useEffect, useMemo } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import BASE_URL from "../../../constants/apiConfig";
import Spinner from "../../Spinner/Spinner";
import useAddToCart from "../../../hooks/useAddToCart";

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

const Trendy = () => {
  const addToCartHandler = useAddToCart();;
  const [activeTab, setActiveTab] = useState("tab1");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake review data
    const fakeReviewList = [
      "4.8k+ reviews", "3.5k+ reviews", "5.1k+ reviews", "2.2k+ reviews", "4.1k+ reviews",
      "1.9k+ reviews", "3.8k+ reviews", "3.1k+ reviews", "2.5k+ reviews", "4.9k+ reviews",
      "1.1k+ reviews", "2.9k+ reviews", "1.4k+ reviews", "3.6k+ reviews", "2.0k+ reviews",
      "1.7k+ reviews", "2.4k+ reviews", "1.3k+ reviews", "1.6k+ reviews", "1.2k+ reviews",
      "2.6k+ reviews", "3.4k+ reviews", "4.3k+ reviews", "1.8k+ reviews", "2.1k+ reviews",
      "3.9k+ reviews", "4.2k+ reviews", "2.3k+ reviews", "1.5k+ reviews", "5.0k+ reviews",
      "1.0k+ reviews", "2.8k+ reviews", "3.3k+ reviews", "4.6k+ reviews", "3.2k+ reviews", 
      "2.7k+ reviews", "1.8k+ reviews", "4.5k+ reviews",
      "3.0k+ reviews", "2.2k+ reviews", "1.9k+ reviews", "3.7k+ reviews", "2.6k+ reviews",
      "4.4k+ reviews", "3.3k+ reviews", "2.1k+ reviews", "1.6k+ reviews", "3.5k+ reviews",
      "4.0k+ reviews", "2.9k+ reviews"
    ];

  const cartItems = useSelector((state) => state.cart.items);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/products/`);
      const data = await response.json();

      // Map products to include fake reviews and ratings
      const productsWithReviews = data.map((product, index) => ({
        ...product,
        productReviews: fakeReviewList[index % fakeReviewList.length],
        rating: (Math.random() * 2 + 3).toFixed(1),
      }));
      

      setProducts(productsWithReviews);
      // setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

    fetchProducts();
  }, []);


  // useMemo optimized data
  const allProducts = useMemo(() => {
    return products.length > 0 ? products.slice(0, 8) : [];
  }, [products]);

  const newArrivals = useMemo(() => {
    return products.length > 0 ? [...products.slice(0, 8)].reverse() : [];
  }, [products]);

  const bestSellers = useMemo(() => {
  const parseReview = (str) => {
    return str.includes("k")
      ? parseFloat(str) * 1000
      : parseInt(str.replace(/[^\d]/g, ""));
  };

    return products.length > 0
      ? [...products.slice(0, 8)].sort((a, b) => {
          const reviewsA = parseReview(a.productReviews);
          const reviewsB = parseReview(b.productReviews);
          return reviewsB - reviewsA;
        })
      : [];
  }, [products]);

  const topRated = useMemo(() => {
    return products.length > 0 ? [...products.slice(0, 8)].sort((a, b) => b.rating - a.rating) : [];
  }, [products]);

  // render cards
  const renderProducts = (products) =>
    products.map((product) => (
      <div className="trendyProductContainer" key={product.id}>
        <div className="trendyProductImages">
          <Link to={`/product/${product.id}`} onClick={scrollToTop}>
            <img
              src={`${BASE_URL}${product.images?.[0]}`}
              alt=""
              loading="lazy"
              className="trendyProduct_front"
            />
          </Link>
          <h4 onClick={() => addToCartHandler(product)}>Add to Cart</h4>
        </div>
        <div className="trendyProductInfo">
          <div className="trendyProductCategoryWishlist">
            <p>{product.name}</p>
          </div>
          <div className="trendyProductNameInfo">
            <Link to={`/product/${product.id}`} onClick={scrollToTop}>
              <h5>{product.description}</h5>
            </Link>
            <p>₹{product.price}</p>
            <div className="trendyProductRatingReviews">
              <div className="trendyProductRatingStar">
                {renderStars(product.rating || 4.3)}
              </div>
              <span>{product.productReviews}</span>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="trendyProducts">
      <h2>
        Our Trendy <span>Products</span>
      </h2>

      <div className="trendyTabs">
        <div className="tabs">
          <p onClick={() => handleTabClick("tab1")} className={activeTab === "tab1" ? "active" : ""}>All</p>
          <p onClick={() => handleTabClick("tab2")} className={activeTab === "tab2" ? "active" : ""}>New Arrivals</p>
          <p onClick={() => handleTabClick("tab3")} className={activeTab === "tab3" ? "active" : ""}>Best Seller</p>
          <p onClick={() => handleTabClick("tab4")} className={activeTab === "tab4" ? "active" : ""}>Top Rated</p>
        </div>

        <div className="trendyTabContent">
          <div className="trendyMainContainer">
            {loading ? (
              <Spinner />
            ) : activeTab === "tab1" ? (
              renderProducts(allProducts)
            ) : activeTab === "tab2" ? (
              renderProducts(newArrivals)
            ) : activeTab === "tab3" ? (
              renderProducts(bestSellers)
            ) : activeTab === "tab4" ? (
              renderProducts(topRated)
            ) : null}
          </div>
        </div>
      </div>

      <div className="discoverMore">
        <Link to="/shop" onClick={scrollToTop}>
          <p>Discover More</p>
        </Link>
      </div>
    </div>
  );
};

export default Trendy;
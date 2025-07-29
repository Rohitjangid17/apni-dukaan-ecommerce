import React, { useState, useMemo } from "react";
import "./Trendy.css";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../constants/apiConfig";
import Spinner from "../../Spinner/Spinner";
import useProducts from "../../../hooks/useProducts";
import RenderStars from "../../../Utils/RenderStars";

const Trendy = () => {
  const { products, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate()

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


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
      <div className="trendyProductContainer" key={product.productId}>
        <div className="trendyProductImages">
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
        <div className="trendyProductInfo">
          <div className="trendyProductCategoryWishlist">
            <p>{product.category?.name || 'Apparel'}</p>
          </div>
          <div className="trendyProductNameInfo">
            <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
              <h5>{product.name}</h5>
            </Link>
            <p>₹{product.price}</p>
            <div className="trendyProductRatingReviews">
              <div className="trendyProductRatingStar">
                {RenderStars(product.rating || 4.3)}
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
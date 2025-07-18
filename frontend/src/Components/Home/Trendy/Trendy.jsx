import React, { useState, useMemo } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");

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

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#07bc0c" },
      });
    }
  };

  // useMemo optimized data
  const allProducts = useMemo(() => StoreData.slice(0, 8), []);
  const newArrivals = useMemo(() => [...StoreData.slice(0, 8)].reverse(), []);
  const bestSellers = useMemo(() => {
    return [...StoreData.slice(0, 8)].sort((a, b) => {
      const reviewsA = parseInt(a.productReviews.replace("k+ reviews", "").replace(",", ""));
      const reviewsB = parseInt(b.productReviews.replace("k+ reviews", "").replace(",", ""));
      return reviewsB - reviewsA;
    });
  }, []);
  const topRated = useMemo(() => {
    return [...StoreData.slice(0, 8)].sort((a, b) => a.productPrice - b.productPrice);
  }, []);

  // render cards
  const renderProducts = (products) =>
    products.map((product) => (
      <div className="trendyProductContainer" key={product.id}>
        <div className="trendyProductImages">
          <Link to="/Product" onClick={scrollToTop}>
            <img
              src={product.frontImg}
              alt=""
              loading="lazy"
              className="trendyProduct_front"
            />
          </Link>
          <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
        </div>
        <div className="trendyProductInfo">
          <div className="trendyProductCategoryWishlist">
            <p>{product.productTitle}</p>
          </div>
          <div className="trendyProductNameInfo">
            <Link to="/Product" onClick={scrollToTop}>
              <h5>{product.productName}</h5>
            </Link>
            <p>₹{product.productPrice}</p>
            <div className="trendyProductRatingReviews">
              <div className="trendyProductRatingStar">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} color="#FEC78A" size={10} />
                  ))}
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
          {activeTab === "tab1" && <div className="trendyMainContainer">{renderProducts(allProducts)}</div>}
          {activeTab === "tab2" && <div className="trendyMainContainer">{renderProducts(newArrivals)}</div>}
          {activeTab === "tab3" && <div className="trendyMainContainer">{renderProducts(bestSellers)}</div>}
          {activeTab === "tab4" && <div className="trendyMainContainer">{renderProducts(topRated)}</div>}
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
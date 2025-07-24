import React, { useState, useEffect } from "react";
import "./ShopDetails.css";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import BASE_URL from "../../../constants/apiConfig";
import Spinner from "../../Spinner/Spinner";
import useAddToCart from "../../../hooks/useAddToCart";
import useProducts from "../../../hooks/useProducts";
import RenderStars from "../../../Utils/RenderStars";

const ShopDetails = () => {

  const addToCartHandler = useAddToCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    products,
    loading,
    page,
    totalPages,
    setPage,
  } = useProducts();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };


const handlePageChange = (newPage) => {
  setPage(newPage);
  scrollToTop();
};

   const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
    scrollToTop()
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
    scrollToTop()
  };


  return (
    <>
      {loading ? (
        <div className="loaderContainer">
          <Spinner/>
        </div>
      ) : (
      
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select name="sort" id="sort">
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="topRated">Top Rated</option>
                  <option value="bestSelling">Best Selling</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {products.map((product) => (
                  <div className="sdProductContainer" key={product.productId}>
                    <div className="sdProductImages">
                      <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
                        {product.images && product.images.length > 0 && (
                          <img src={`${BASE_URL}${product.images[0]}`}
                          loading="lazy"
                          className="sdProduct_front"
                          alt="product image" />
                        )}
                      </Link>
                      <h4 onClick={() => addToCartHandler(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>{product.category?.name || 'Apparel'}</p>
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
                          <h5>{product?.name}</h5>
                        </Link>

                        <p>₹{product?.price}</p>
                        <div className="sdProductRatingReviews">
                          <div className="sdProductRatingStar">
                            {RenderStars(product.rating || 4.3)}
                          </div>
                          <span>{product.productReviews}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <button onClick={handlePrev} disabled={page === 1}>
                  <FaAngleLeft />
                  Prev
                </button>
              </div>
              <div className="sdPaginationNumber">
                  <div className="paginationNum">
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <p
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={pageNumber === page ? "activePage" : ""}
                        >
                          {pageNumber}
                        </p>
                      );
                    })}
                  </div>
                </div>
              <div className="sdPaginationNext">
                <button onClick={handleNext} disabled={page === totalPages}>
                  Next
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}


      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;

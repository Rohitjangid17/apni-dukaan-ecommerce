import React, { useState, useEffect } from "react";
import "./ShopDetails.css";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import BASE_URL from "../../../constants/apiConfig";
import Spinner from "../../Spinner/Spinner";
import useAddToCart from "../../../hooks/useAddToCart";
import useShopProductList from "../../../hooks/useShopProductList";
import RenderStars from "../../../Utils/RenderStars";
import not_found_img from "../../../Assets/not_found.png"

const ShopDetails = () => {
  const addToCartHandler = useAddToCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    colors: [],
    sizes: [],
    priceRange: [100, 5000],
    sort_by: "",
  });

  const { products, loading, totalPages } = useShopProductList({ filters, limit: 12, page });

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

    useEffect(() => {
      setPage(1);
    }, [filters]);

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
            <Filter filters={filters} setFilters={setFilters} scrollToTop={scrollToTop} />
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
                <select
                    name="sort"
                    id="sort"
                    value={filters.sort_by || "recommended"}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        sort_by: selected === "recommended" ? "" : selected,
                      }));
                    }}
                  >
                  <option value="" disabled>Sort By</option>
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="top_rated">Top Rated</option>
                  <option value="best_selling">Best Selling</option>
                </select>

                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
              <div className="shopDetailsProducts">
              {products.length === 0 ? (
              <div className="noProductsWrapper">
                <img src={not_found_img} alt="No Products Found" />
                <h3>No Products Found</h3>
                <p>No matching products. Adjust your filters.</p>
              </div>
              ) : (
                <div className="shopDetailsProductsContainer">
                  {products.map((product) => (
                    <div className="sdProductContainer" key={product.productId}>
                      <div className="sdProductImages">
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
                        <h4 onClick={() => addToCartHandler(product)}>Add to Cart</h4>
                      </div>
                      <div className="sdProductInfo">
                        <div className="sdProductCategoryWishlist">
                          <p>{product.category?.name || "Apparel"}</p>
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
            )}
              </div>
            {products.length > 0 && (
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
              )}
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
          <Filter filters={filters} setFilters={setFilters} scrollToTop={scrollToTop} />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
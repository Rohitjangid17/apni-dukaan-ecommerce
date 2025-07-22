import React, { useState, useEffect } from "react";
import "./AdditionalInfo.css";
import BASE_URL from "../../../constants/apiConfig";

import user1 from "../../../Assets/Users/user1.jpg";
import user2 from "../../../Assets/Users/user2.jpg";

import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";

const AdditionalInfo = ({ productId }) => {
  const [activeTab, setActiveTab] = useState("aiTab1");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading additional info...</p>;

  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Description
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Additional Information
              </p>
              <p
                onClick={() => handleTabClick("aiTab3")}
                className={activeTab === "aiTab3" ? "aiActive" : ""}
              >
                Reviews (2)
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 / Description*/}
            {activeTab === "aiTab1" && (
            <div className="aiTabDescription">
              {product.name && (
                <div className="descriptionPara">
                  <h3>Category</h3>
                  <p>{product.name || '-'}</p>
                </div>
              )}
              {product.description && (
                <div className="descriptionPara">
                  <h3>Description</h3>
                  <p>{product.description || '-'}</p>
                </div>
              )}
              {product.tags?.length > 0 && (
                <div className="descriptionPara">
                  <h3>Tags</h3>
                  <p>{product.tags.join(", ")}</p>
                </div>
              )}
              {product.lining && (
                <div className="descriptionPara">
                  <h3>Lining Material</h3>
                  <p>{product.lining || '-'}</p>
                </div>
              )}
              {product.storage && (
                <div className="descriptionPara">
                  <h3>Storage Info</h3>
                  <p>{product?.storage || '-'}</p>
                </div>
              )}
            </div>
          )}

            {/* Tab2 / Additional Info*/}

            {activeTab === "aiTab2" && (
            <div className="aiTabAdditionalInfo">
              {product.weight && (
                <div className="additionalInfoContainer">
                  <h6>Weight</h6>
                  <p>{product.weight} kg</p>
                </div>
              )}
              {product.dimensions && (
                <div className="additionalInfoContainer">
                  <h6>Dimensions</h6>
                  <p>{product.dimensions}</p>
                </div>
              )}
              {product.sizes?.length > 0 && (
                <div className="additionalInfoContainer">
                  <h6>Sizes Available</h6>
                  <p>{product.sizes.join(", ")}</p>
                </div>
              )}
              {product.colors?.length > 0 && (
                <div className="additionalInfoContainer">
                  <h6>Colors Available</h6>
                  <p>{product.colors.join(", ")}</p>
                </div>
              )}
            </div>
          )}

            {/* Tab3 / Reviews*/}

            {activeTab === "aiTab3" && (
              <div className="aiTabReview">
                <div className="aiTabReviewContainer">
                  <h3>Reviews</h3>
                  <div className="userReviews">
                    <div
                      className="userReview"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      <div className="userReviewImg">
                        <img src={user1} alt="" loading="lazy" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Rahul Sharma</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>June 10, 2025</p>
                          </div>
                        </div>
                        <div
                          className="userReviewBottomContent"
                          style={{ marginBottom: "30px" }}
                        >
                          <p>
                            Quality is top-notch! Got so many compliments during
                          my cousin’s wedding. Fits perfectly and the color is
                          just as shown. Value for money!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="userReview">
                      <div className="userReviewImg">
                        <img src={user2} alt="" loading="lazy" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Anjali Verma</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>May 22, 2025</p>
                          </div>
                        </div>
                        <div className="userReviewBottomContent">
                          <p>
                            I bought this for my brother and he loved it.
                          Breathable material and good stitching. Would
                          recommend it for any festive occasion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="userNewReview">
                    <div className="userNewReviewMessage">
                      <h5>
                        Be the first to review “Premium Cotton Kurta Set for Men”
                      </h5>
                      <p>
                        Your email address will not be published. Required fields are marked *
                      </p>
                    </div>
                    <div className="userNewReviewRating">
                      <label>Your rating *</label>
                      <Rating name="simple-controlled" size="small" />
                    </div>
                    <div className="userNewReviewForm">
                      <form>
                        <textarea
                          cols={30}
                          rows={8}
                          placeholder="Your Review"
                        />
                        <input
                          type="text"
                          placeholder="Name *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <input
                          type="email"
                          placeholder="Email address *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <div className="userNewReviewFormCheck">
                          <label>
                            <input type="checkbox" placeholder="Subject" />
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </label>
                        </div>

                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;

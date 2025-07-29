import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotalAmount,
  setCartItems
} from "../../Features/Cart/cartSlice";

import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import success from "../../Assets/success.png";
import toast from "react-hot-toast";
import BASE_URL from "../../constants/apiConfig";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    state: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    email: "",
    notes: ""
  });

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);


  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch(`${BASE_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      const formatted = data.map((item) => ({
        userId: item.user_id,
        cartId: item.cart_id,
        productId: item.product_id,
        productName: item.product.name || 'My Product',
        productPrice: parseFloat(item.product.price),
        quantity: item.quantity,
        frontImg: item.product.images?.[0],
        images: item.product.images,
        productReviews: item.reviews || "1.2k reviews",
      }));

      dispatch(setCartItems(formatted));
    } catch (err) {
      console.error("Fetch cart failed", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) {
      setActiveTab(tab);
    }
  };

  const handleQuantityChange = (cartId, quantity) => {
    if (quantity >= 1 && quantity <= 20) {
      dispatch(updateQuantity({ cartId, quantity }));
    }
  };

  const totalPrice = useSelector(selectCartTotalAmount);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // current Date
  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number

  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data

  const [selectedPayment, setSelectedPayment] = useState(
    "UPI / Bank Transfer"
  );

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const showErrorToast = (message) =>
    toast.error(message, {
      duration: 2000,
      style: { backgroundColor: "#ff4b4b", color: "white" },
      iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
    });


  // Function to handle checkout access

  const handleCheckoutAccess = (targetTab, callback = () => { }) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      showErrorToast("Please login or sign up to continue checkout.");
      navigate("/loginSignUp");
      return;
    }

    handleTabClick(targetTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
    callback();
  };

  const isFormValid = () => {
    const {
      firstName,
      lastName,
      state,
      address,
      city,
      pincode,
      phone,
      email
    } = billingInfo;

    if (
      !firstName ||
      !lastName ||
      !state ||
      !address ||
      !city ||
      !pincode ||
      !phone ||
      !email
    ) {
      toast.error("Please complete all Billing Details before placing your order.");
      return false;
    }

    // Additional checks (optional)
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Enter a valid 6-digit pincode.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
  if (!isFormValid()) return;
  handleCheckoutAccess("cartTab3", () => setPayments(true));
};

  const handleRemoveFromCart = async (cartId) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete item from backend");

      dispatch(removeFromCart(cartId));
      await fetchCartItems(dispatch);
      toast.success("Item removed from cart", {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#07bc0c" },
      });
    } catch (err) {
      console.error("Delete cart item error:", err);
      toast.error("Failed to remove item");
    }
  };

  return (
    <>
      <div className="shoppingCartSection">
        <h2>Cart</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Shopping Bag</h3>
                  <p>Manage Your Items List</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartItems.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Shipping and Checkout</h3>
                  <p>Checkout Your Items List</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartItems.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Confirmation</h3>
                  <p>Review And Submit Your Order</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  {/* For Desktop Devices */}
                  {cartItems.length > 0 ? (
                    <table className="shoppingBagTable">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th></th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>

                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td data-label="Product">
                              <div className="shoppingBagTableImg">
                                <Link to={`/product/${item.productId}`} onClick={scrollToTop}>
                                  <img src={`${BASE_URL}${item.images?.[0]}`} alt="" loading="lazy" />
                                </Link>
                              </div>
                            </td>
                            <td data-label="">
                              <div className="shoppingBagTableProductDetail">
                                <Link to={`/product/${item.productId}`} onClick={scrollToTop}>
                                  <h4>{item.productName}</h4>
                                </Link>
                                <p>{item.productReviews}</p>
                              </div>
                            </td>
                            <td
                              data-label="Price"
                              style={{ textAlign: "center" }}
                            >
                              ₹{item.productPrice}
                            </td>
                            <td data-label="Quantity">
                              <div className="ShoppingBagTableQuantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item.cartId, item.quantity - 1)
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  max="20"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(item.cartId, parseInt(e.target.value) || 1)
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item.cartId, item.quantity + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              <p
                                style={{
                                  textAlign: "center",
                                  fontWeight: "500",
                                }}
                              >
                                ₹{item.quantity * item.productPrice}
                              </p>
                            </td>
                            <td data-label="">
                              <MdOutlineClose
                                onClick={() => handleRemoveFromCart(item.cartId)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="shoppingCartEmpty">
                      <span>Your cart is empty!</span>
                      <Link to="/shop" onClick={scrollToTop}>
                        <button>Shop Now</button>
                      </Link>
                    </div>
                  )}

                  {/* For Mobile devices */}

                  <div className="shoppingBagTableMobile">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item, index) => (
                          <div key={index}>
                            <div className="shoppingBagTableMobileItems">
                              <div className="shoppingBagTableMobileItemsImg">
                                <Link to={`/product/${item.productId}`} onClick={scrollToTop}>
                                  <img src={`${BASE_URL}${item.images?.[0]}`} alt="" loading="lazy" />
                                </Link>
                              </div>
                              <div className="shoppingBagTableMobileItemsDetail">
                                <div className="shoppingBagTableMobileItemsDetailMain">
                                  <Link to={`/product/${item.productId}`} onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews}</p>
                                  <div className="shoppingBagTableMobileQuantity">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity - 1
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      min="1"
                                      max="20"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.productID,
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span>₹{item.productPrice}</span>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetailTotal">
                                  <MdOutlineClose
                                    size={20}
                                    onClick={() => handleRemoveFromCart(item.cartId)}
                                  />
                                  <p>₹{item.quantity * item.productPrice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Your cart is empty!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Shop Now</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>Cart Totals</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>₹{totalPrice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>
                          <div className="shoppingBagTotalTableCheck">
                            <p>₹{(totalPrice === 0 ? 0 : 5).toFixed(2)}</p>
                            <p>Shipping to Jaipur</p>
                            <p
                              onClick={scrollToTop}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              CHANGE ADDRESS
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>VAT</th>
                        <td>₹{(totalPrice === 0 ? 0 : 11).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>
                          ₹{(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => handleCheckoutAccess("cartTab2")}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <div className="checkoutSection">
                <div className="checkoutDetailsSection">
                  <h4>Billing Details</h4>
                  <div className="checkoutDetailsForm">
                    <form>
                      <div className="checkoutDetailsFormRow">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={billingInfo.firstName}
                          onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={billingInfo.lastName}
                            onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                          />
                      </div>
                      <input
                            type="text"
                            placeholder="Company Name (Optional)"
                            value={billingInfo.company}
                            onChange={(e) => setBillingInfo({ ...billingInfo, company: e.target.value })}
                          />
                        <select
                            name="state"
                            value={billingInfo.state}
                            onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                          >
                        <option value="" selected disabled>Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Chandigarh">Chandigarh</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Street Address*"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                      />

                      <input
                        type="text"
                        placeholder="Town / City *"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                      />

                      <input
                        type="text"
                        placeholder="6-digit Pincode *"
                        maxLength={6}
                        value={billingInfo.pincode}
                        onChange={(e) => setBillingInfo({ ...billingInfo, pincode: e.target.value })}
                      />

                      <input
                        type="text"
                        placeholder="Phone *"
                        maxLength={10}
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                      />

                      <input
                        type="email"
                        placeholder="Your Mail *"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                      />

                      <textarea
                        placeholder="Order notes (optional)"
                        value={billingInfo.notes}
                        onChange={(e) => setBillingInfo({ ...billingInfo, notes: e.target.value })}
                      />
                    </form>
                  </div>
                </div>
                <div className="checkoutPaymentSection">
                  <div className="checkoutTotalContainer">
                    <h3>Your Order</h3>
                    <div className="checkoutItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.productName} x {item.quantity}
                              </td>
                              <td>₹{item.productPrice * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="checkoutTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{totalPrice.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹5</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>₹11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              ₹
                              {(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="checkoutPaymentContainer">
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Direct Bank Transfer"
                        defaultChecked
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>UPI / Bank Transfer</span>
                        <p>
                          You can pay directly via UPI apps like PhonePe, Google Pay, or through a direct bank transfer. Please use your Order ID as the payment reference. Your order will be processed once payment is confirmed.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Cash on delivery"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Cash on Delivery (COD)</span>
                        <p>
                          Pay in cash when your order is delivered at your doorstep. Available only for select pincodes and products.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Paypal"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Paytm / Mobile Wallets</span>
                        <p>
                          Use your preferred mobile wallet like Paytm, PhonePe, or Mobikwik to complete the payment securely.
                        </p>
                      </div>
                    </label>
                    <div className="policyText">
                      To know more, read our{" "}
                      <Link to="/terms" onClick={scrollToTop}>
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handlePlaceOrder("cartTab3", () => setPayments(true))
                    }
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" loading="lazy" />
                    </div>
                    <h3>Your order is completed!</h3>
                    <p>Thank you. Your order has been received.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Order Number</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Date</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Total</p>
                      <h4>₹{totalPrice.toFixed(2)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Payment Method</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Order Details</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.productName} x {item.quantity}
                              </td>
                              <td>₹{item.productPrice * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{totalPrice.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹5</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>₹11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              ₹
                              {(totalPrice === 0 ? 0 : totalPrice + 16).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default ShoppingCart;

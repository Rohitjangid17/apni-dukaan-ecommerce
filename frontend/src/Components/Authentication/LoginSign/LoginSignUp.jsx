import React, { useState, useEffect } from "react";
import "./LoginSignUp.css";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../../constants/apiConfig";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../Features/Cart/cartSlice";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [userInfo, setUserInfo] = useState(null)

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tabButton1");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle tab switching

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const showSuccessToast = (message) =>
  toast.success(message, {
    duration: 2000,
    style: { backgroundColor: "#07bc0c", color: "white" },
    iconTheme: { primary: "#fff", secondary: "#07bc0c" },
  });

  const showErrorToast = (message) =>
  toast.error(message, {
    duration: 2000,
    style: { backgroundColor: "#ff4b4b", color: "white" },
    iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
  });


  const storeUserInfo = (user) => {
  const savedUserData = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
  };
    setUserInfo(savedUserData);
    localStorage.setItem("userInfo", JSON.stringify(savedUserData));
  };


  // Handle login function

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await res.json();

    if (res.ok && data?.access_token) {
          // Save token and show successful message
          localStorage.setItem("access_token", data.access_token);
          showSuccessToast(data.message || "Login successful.");

          // Clear login form fields
          setLoginEmail("");
          setLoginPassword("");
          setIsLoggedIn(true);

          storeUserInfo(data.user);

          // Navigate to shop page
          navigate("/shop");

      } else {
        showErrorToast(data?.detail || "Login failed");
        console.warn("Login error:", data);
      }
    } catch (error) {
      showErrorToast(`Login error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  


  // Handle signup function

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.access_token) {
          // Save token and Show success message
          localStorage.setItem("access_token", data.access_token);
          showSuccessToast(data.message || "Signup successful.");

          // Clear signup form fields
          setUsername("");
          setEmail("");
          setPassword("");
          setIsLoggedIn(true);

          storeUserInfo(data.user);

          // Navigate to shop page
          navigate("/shop");  

          } else {
            showErrorToast(data?.detail || "Signup failed");
            console.warn("Signup error:", data);
          }
        } catch (error) {
          console.error("Signup error:", error);
          showErrorToast(`Signup error: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };


      // Retrieve user info from localStorage on component mount
      useEffect(() => {
        const savedUserData = localStorage.getItem("userInfo");
        if (savedUserData) {
          try {
            const parsedData = JSON.parse(savedUserData);
            setUserInfo(parsedData);
          } catch (err) {
            console.error("Error parsing saved user info from localStorage", err);
          }
        }
      }, [isLoggedIn]);


      // Handle logout function
      const handleLogout = () => {
        dispatch(clearCart());
        localStorage.removeItem("access_token");
        localStorage.removeItem("userInfo");
        setIsLoggedIn(false);
        setUserInfo(null);
        setLoginEmail("");
        setLoginPassword("");
        setEmail("");
        setUsername("");
        setPassword("");
        showSuccessToast("Logged out successfully.");
      };

  return (
    <>
        {isLoggedIn && userInfo ? (
        <div className="userInfoContainer">
          <div className="userInfoCard">
            <h1 className="welcomeTitle">Welcome to Apni Dukaan</h1>
            <div className="userInfoDetails">
            <div className="userAvatar">
              {userInfo?.email?.charAt(0)?.toUpperCase() || ""}
            </div>
            <div>
            <p><strong>Name:</strong> {userInfo.username || userInfo.email?.split("@")[0]}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
            </div>
            <button className="logoutButton" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
      // Login/Sign Up Section
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Sign Up
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* Login Tab */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLogin}>
                  <input 
                  type="email" 
                  placeholder="Email address *" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required 
                  />

                  <input 
                  type="password" 
                  placeholder="Password *" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                  </div>
                  <button type="submit">{loading ? "Logging in..." : "Log In"}</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Sign Up Tab */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleSignup}>
                  <input
                      type="text"
                      placeholder="Username *"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email address *"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password *"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  <p>
                    This info is only used for your account and experience.
                  </p>
                  <button type="submit">{loading ? "Creating your account..." : "Sign Up"}</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default LoginSignUp;

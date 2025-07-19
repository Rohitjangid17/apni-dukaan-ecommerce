import React, { useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginSignUp = () => {
  const navigate = useNavigate();
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


  // Handle login function

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
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
          // Save token
          localStorage.setItem("access_token", data.access_token);
          console.log("Login token saved to localStorage.");
          console.log("Token:", data.access_token);

          // Show success message
          showSuccessToast("Login successful.");

          // Clear login form fields
          setLoginEmail("");
          setLoginPassword("");
          setIsLoggedIn(true);

          const savedUserData = {
            email: loginEmail,
          };
          
          // Save user info to state and localStorage
          setUserInfo(savedUserData);
          console.log("userInfo after login:", savedUserData);
          localStorage.setItem("userInfo", JSON.stringify(savedUserData));

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
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
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
          // Save token
          localStorage.setItem("access_token", data.access_token);
          console.log("Sign up token saved to localStorage.");

          // Show success message
          showSuccessToast("Signup successful.");
          console.log("Token:", data.access_token);

          // Clear signup form fields
          setUsername("");
          setEmail("");
          setPassword("");
          setIsLoggedIn(true);

          const savedUserData = {
            username,
            email,
          };

          // Save user info to state and localStorage
          setUserInfo(savedUserData);
          console.log("userInfo after signup:", savedUserData);
          localStorage.setItem("userInfo", JSON.stringify(savedUserData));

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
            console.log("Retrieved userInfo from localStorage:", parsedData);
          } catch (err) {
            console.error("Error parsing saved user info from localStorage", err);
          }
        }
      }, [isLoggedIn]);


      // Handle logout function
      const handleLogout = () => {
      localStorage.removeItem("access_token");
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
                    <p>
                      <Link to="/resetPassword">Forgot your password</Link>
                    </p>
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

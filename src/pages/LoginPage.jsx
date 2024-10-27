import React, { useState } from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email format is invalid.";
    } else if (email.length > 254) {
      errors.email = "Email must be less than 254 characters.";
    } else if (/[^a-zA-Z0-9._%+-@]/.test(email)) {
      errors.email = "Email contains invalid characters.";
    } else {
      const [localPart, domain] = email.split("@");
      if (localPart.length > 64) {
        errors.email = "Local part of email must be less than 65 characters.";
      }
      if (domain.length > 253) {
        errors.email = "Domain part of email must be less than 254 characters.";
      }
      if (!domain.includes(".")) {
        errors.email = "Domain part must contain a dot.";
      }
      if (domain.startsWith(".") || domain.endsWith(".")) {
        errors.email = "Domain part cannot start or end with a dot.";
      }
      if (/\.{2,}/.test(domain)) {
        errors.email = "Domain part cannot contain consecutive dots.";
      }
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (validateForm()) {
      setSuccessMessage("Login successful! Redirecting...");
      navigate("/products");
    }
  };

  return (
    <div id="main">
      <div className="bothparts" id="left">
        <div id="imgboxxxx">
          <h1>SIGN IN</h1>
          <p>
            Welcome back! Enter your details below to access your account and
            continue your shopping journey.
          </p>
        </div>
      </div>
      <div className="bothparts" id="right">
        <div id="rightinsidebox">
          <h1 id="h11">Hi there!</h1>
          <p id="backpara">Welcome back!</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              className="inputid"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className="error">{error.email}</p>}

            <label>Password</label>
            <input
              type="password"
              className="inputid"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p className="error">{error.password}</p>}

            <div id="ForgetPassword">
              <a href="/reset-password">Forgot Password?</a>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" id="butt">
                Log In
              </button>
            </div>

            <p id="para">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

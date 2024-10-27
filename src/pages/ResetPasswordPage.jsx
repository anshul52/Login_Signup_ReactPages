import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError({});

    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email format." }));
      return;
    }

    setIsEmailSubmitted(true);
    setSuccessMessage("Reset instructions have been sent to your email.");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError({});
    setSuccessMessage("");

    if (!newPassword) {
      setError((prev) => ({
        ...prev,
        newPassword: "New password is required.",
      }));
    } else if (!validatePassword(newPassword)) {
      setError((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
    }

    if (!confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required.",
      }));
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setError((prev) => ({ ...prev, confirm: "Passwords do not match." }));
      return;
    }

    setSuccessMessage("Password reset successfully! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="reset-password-container"
        style={{
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Reset Password</h2>
        <h6 style={{ marginBottom: "20px", fontSize: "13px" }}>
          No worries, we'll send you reset instructions.
        </h6>
        {error.general && (
          <p className="error" style={{ color: "red" }}>
            {error.general}
          </p>
        )}

        {!isEmailSubmitted ? (
          <form onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email">
                Please provide your Registered Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error.email && (
                <p className="error" style={{ color: "red" }}>
                  {error.email}
                </p>
              )}
            </div>
            <button id="butt" type="submit">
              Reset
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="new-password">New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error.newPassword && (
                <p className="error" style={{ color: "red" }}>
                  {error.newPassword}
                </p>
              )}
              {error.password && (
                <p className="error" style={{ color: "red" }}>
                  {error.password}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error.confirmPassword && (
                <p className="error" style={{ color: "red" }}>
                  {error.confirmPassword}
                </p>
              )}
              {error.confirm && (
                <p className="error" style={{ color: "red" }}>
                  {error.confirm}
                </p>
              )}{" "}
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <button id="butt" type="submit">
                Reset Password
              </button>
              <button
                id="butt"
                type="button"
                onClick={() => navigate("/login")}
              >
                Login/Signup
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

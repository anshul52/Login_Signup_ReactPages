import React from "react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#f8f9fa",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "#dc3545" }}>404</h1>
      <h2 style={{ fontSize: "24px", color: "#333" }}>Page Not Found</h2>
      <p style={{ color: "#555" }}>
        The page you are looking for does not exist.
      </p>
      <a
        href="/signup"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Go to Signup
      </a>
    </div>
  );
};

export default NotFoundPage;

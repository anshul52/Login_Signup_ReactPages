import React from "react";
import { IoSearch } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
const Nav = () => {
  return (
    <nav
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Poppins",
        padding: "20px",
        borderBottom: "2px solid #dadada",
        marginBottom: "15px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "15px",
        }}
      >
        <div>
          <a href="/products" style={{ textDecoration: "none", color: "#000" }}>
            Products
          </a>
        </div>
        <div>About</div>
        <div>Delivery</div>
        <div>Blog</div>
        <div>Support</div>
      </div>
      <div
        style={{
          fontWeight: "800",
          fontSize: "20px",
          marginRight: "250px",
        }}
      >
        <a href="/products" style={{ textDecoration: "none", color: "#000" }}>
          <span style={{ color: "orange" }}>My </span>
          Store
        </a>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ scale: "1.3" }}>
          <IoSearch />
        </div>
        <div style={{ scale: "1.3" }}>
          <a href="/cart">
            <GrCart />
          </a>
        </div>
        <div style={{ scale: "1.3" }}>
          <a href="/login" style={{ textDecoration: "none", color: "#000" }}>
            <CgProfile />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

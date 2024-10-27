import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/nav";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return <h2>Your cart is empty!</h2>;
  }

  return (
    <>
      {" "}
      <Nav />
      <div style={{ padding: "30px", fontFamily: "Poppins" }}>
        <h2>Your Cart</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ fontSize: "16px" }}>{item.title}</h3>
                <p style={{ color: "#f39c12", fontWeight: "bold" }}>
                  ${item.price} x {item.quantity}
                </p>
                <p>Total - {`${item.price * item.quantity}`}</p>
              </div>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  maxWidth: "100px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;

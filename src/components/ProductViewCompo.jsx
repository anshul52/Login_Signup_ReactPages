import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const categories = [
  "jewelery",
  "men's clothing",
  "women's clothing",
  "electronics",
];

const ProductViewCompo = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await Promise.all(
          categories.map((category) =>
            axios.get(`https://fakestoreapi.com/products/category/${category}`)
          )
        );
        const productsData = allProducts.flatMap((response) => response.data);
        setProducts(productsData);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = products.filter((product) => product.category === category);
    return acc;
  }, {});

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + change, 0),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity },
      });
      toast.success(`${product.title} added to cart!`);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
      console.log(`Added ${product.title} with quantity ${quantity} to cart.`);
    } else {
      toast.error("Please select a quantity!");
    }
  };

  return (
    <div style={{ paddingLeft: "30px", fontFamily: "Poppins" }}>
      <h2 style={{ textAlign: "center" }}>Product Categories</h2>
      {categories.map((category) => (
        <div key={category}>
          <h3
            style={{
              textAlign: "left",
              textTransform: "uppercase",
              paddingBottom: "20px",
              marginTop: "50px",
            }}
          >
            {category.replace(/'/g, " ")}
          </h3>
          <div
            className="product-view-container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "left",
              marginBottom: "20px",
            }}
          >
            {groupedProducts[category].map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "28px",
                  width: "350px",
                  padding: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    height: "250px",
                    borderRadius: "8px",
                  }}
                />
                <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                  {product.title}
                </h3>
                <p style={{ color: "#f39c12", fontWeight: "bold" }}>
                  ${product.price}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "10px",
                      backgroundColor: "#dadada",
                    }}
                  >
                    -
                  </button>
                  <span>{quantities[product.id] || 0}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "10px",
                      backgroundColor: "#dadada",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    opacity: "80%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductViewCompo;

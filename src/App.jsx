import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function submit() {
    try {
      const response = await fetch(`http://localhost:1099/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      } else {
        console.error("Login failed:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getProducts() {
    try {
      const response = await fetch("http://localhost:1099/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Failed to fetch products:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={formData.username}
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button onClick={submit} type="button">
          Login
        </button>
      </form>

      <button onClick={getProducts}>Show Products</button>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default App;

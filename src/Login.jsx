import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function login() {
    const response = await fetch("http://localhost:1099/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
    }
  }

  return (
    <div>
      Login
      <form>
        <input
          type="text"
          value={formData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={login} type="button">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;

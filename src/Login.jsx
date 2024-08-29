import React, { useState } from "react";
import {
  NavLink,
  redirect,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [params, setParams] = useSearchParams();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const errorMessage = params.get("message");

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
      setToken(data.token);
      navigate("/");
    }
  }

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
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
        <button>
          <NavLink to="/">Home</NavLink>
        </button>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button>
        <NavLink to="info">Info</NavLink>
      </button>
      <button>
        <NavLink to="login">Login</NavLink>
      </button>
    </div>
  );
};

export default Home;

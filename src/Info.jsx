import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Info = () => {
  const { token } = useAuth();
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:1099/api/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    };

    getData();
  }, [token, navigate]);

  useEffect(() => {
    if (errorMessage) {
      navigate(`/login?message=${encodeURIComponent(errorMessage)}`);
    }
  }, [errorMessage, navigate]);

  return (
    <div>
      <h1>Super Secret Info</h1>
      <p>{data}</p>
      <button>
        <NavLink to="/">Home</NavLink>
      </button>
    </div>
  );
};

export default Info;

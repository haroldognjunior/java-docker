import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState({ title: "", description: "" });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Fallback to localhost
    fetch(`${apiUrl}/api/data`)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parseamos la respuesta JSON
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setData(data); // Establecemos los datos obtenidos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import pizza from "../assets/pizza.png";

const NotFound = () => {
  const [food, setFood] = useState({});

  const getFood = async () => {
    try {
      const res = await fetch("https://foodish-api.com/api/images/pizza");
      if (!res.ok) {
        throw new Error("Server Error");
      }
      const data = await res.json();
      setFood(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="notfound">
      <img
        src={
          (food !== null &&
            typeof food === "object" &&
            typeof food?.image === "string" &&
            food?.image) ||
          pizza
        }
        alt="random food"
        title="Random Food"
      />
      <div className="one">The page you are looking for does not exist.</div>
      <div className="two">Click the navbar above to go back to homepage.</div>
    </div>
  );
};

export default NotFound;

import React, { useState } from "react";
import Direction from "./Direction";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";

const Service = ({ busServices, busService }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <div className="busService" onClick={handleClick}>
        <span>{busService}</span>
        <span>{busServices[busService].name}</span>
        {isOpen ? (
          <img src={minus} alt="closed" />
        ) : (
          <img src={plus} alt="open" />
        )}
      </div>

      <div className="direction">
        {isOpen &&
          busServices[busService].routes.map((direction, idx) => (
            <Direction
              key={idx}
              busService={busService}
              direction={direction}
            />
          ))}
      </div>
    </>
  );
};

export default Service;

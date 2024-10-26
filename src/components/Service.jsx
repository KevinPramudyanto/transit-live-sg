import React, { useState } from "react";
import Direction from "./Direction";
import up from "../assets/up.png";
import down from "../assets/down.png";

const Service = ({ busServices, busService }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <div className="busService" onClick={handleClick}>
        <span>{busService}</span>
        <span>
          {(typeof busServices?.[busService]?.name === "string" &&
            busServices?.[busService]?.name) ||
            "NA"}
        </span>
        {isOpen ? <img src={up} alt="closed" /> : <img src={down} alt="open" />}
      </div>

      <div className="direction">
        {isOpen &&
          busServices?.[busService]?.routes &&
          Array.isArray(busServices?.[busService]?.routes) &&
          busServices?.[busService]?.routes.map(
            (direction, idx) =>
              Array.isArray(direction) && (
                <Direction
                  key={idx}
                  busService={busService}
                  direction={direction}
                />
              )
          )}
      </div>
    </>
  );
};

export default Service;

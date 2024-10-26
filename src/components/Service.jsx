import React, { useState } from "react";
import Direction from "./Direction";

const Service = ({ busServices, service }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="serviceContainer">
      <div className="container" onClick={handleClick}>
        <div>
          <div className="label">Bus No</div>
          <div className="service">{service}</div>
        </div>
        <div className="name">
          {(typeof busServices?.[service]?.name === "string" &&
            busServices?.[service]?.name) ||
            "NA"}
        </div>
        <div className={isOpen ? "arrowUp" : "arrowDown"}></div>
      </div>

      {isOpen &&
        busServices?.[service]?.routes &&
        Array.isArray(busServices?.[service]?.routes) && (
          <div className="direction">
            {busServices?.[service]?.routes.map(
              (direction, idx) =>
                Array.isArray(direction) && (
                  <Direction
                    key={idx}
                    service={service}
                    direction={direction}
                  />
                )
            )}
          </div>
        )}
    </div>
  );
};

export default Service;

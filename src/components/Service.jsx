import React, { useState } from "react";
import Direction from "./Direction";

const Service = ({ busServices, service, isOpen, handleDropdown }) => {
  return (
    <div className="serviceContainer">
      <div className="container" onClick={() => handleDropdown(service)}>
        <div>
          <div className="label">Bus No</div>
          <div className="service">{service}</div>
        </div>
        <div className="name">
          {(typeof busServices?.[service]?.name === "string" &&
            busServices?.[service]?.name) ||
            "NA"}
        </div>
        <div className={isOpen?.[service] ? "arrowUp" : "arrowDown"}></div>
      </div>

      {isOpen?.[service] &&
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

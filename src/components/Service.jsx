import React from "react";
import Direction from "./Direction";

const Service = ({
  services,
  service,
  isOpen,
  handleDropdown,
  isBusSelected,
}) => {
  return (
    <div className="serviceContainer">
      <div className="container" onClick={() => handleDropdown(service)}>
        <div>
          <div className="label">{isBusSelected ? "Bus No" : "Route"}</div>
          <div className="service">{service}</div>
        </div>
        <div className="name">
          {(typeof services?.[service]?.name === "string" &&
            services?.[service]?.name) ||
            "NA"}
        </div>
        <div className={isOpen?.[service] ? "arrowUp" : "arrowDown"}></div>
      </div>

      {isOpen?.[service] &&
        services?.[service]?.routes &&
        Array.isArray(services?.[service]?.routes) && (
          <div className="direction">
            {services?.[service]?.routes.map(
              (direction, idx) =>
                Array.isArray(direction) && (
                  <Direction
                    key={idx}
                    service={service}
                    direction={direction}
                    isBusSelected={isBusSelected}
                  />
                )
            )}
          </div>
        )}
    </div>
  );
};

export default Service;

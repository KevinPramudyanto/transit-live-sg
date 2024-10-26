import React, { useState } from "react";
import Service from "../components/Service";
import { busServices } from "../components/busServices.js";

const All = () => {
  const [isOpen, setIsOpen] = useState({});

  const handleDropdown = (service) => {
    if (isOpen?.[service]) {
      setIsOpen((prevIsOpen) => {
        return {};
      });
    } else {
      setIsOpen((prevIsOpen) => {
        return { [service]: true };
      });
    }
  };

  return (
    <>
      {busServices !== null &&
        typeof busServices === "object" &&
        Object.keys(busServices).map((service, idx) => (
          <Service
            key={idx}
            busServices={busServices}
            service={service}
            isOpen={isOpen}
            handleDropdown={handleDropdown}
          />
        ))}
    </>
  );
};

export default All;

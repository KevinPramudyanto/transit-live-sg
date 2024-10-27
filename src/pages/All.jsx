import React, { useState } from "react";
import Service from "../components/Service";
import { busServices } from "../components/busServices.js";
import { trainServices } from "../components/trainServices.js";

const All = () => {
  const [isBusSelected, setIsBusSelected] = useState(true);
  const [isBusDropdownOpen, setIsBusDropdownOpen] = useState({});
  const [isTrainDropdownOpen, setIsTrainDropdownOpen] = useState({});

  const handleBusDropdown = (service) =>
    isBusDropdownOpen?.[service]
      ? setIsBusDropdownOpen({})
      : setIsBusDropdownOpen({ [service]: true });

  const handleTrainDropdown = (service) =>
    isTrainDropdownOpen?.[service]
      ? setIsTrainDropdownOpen({})
      : setIsTrainDropdownOpen({ [service]: true });

  return (
    <>
      <div className="nav">
        <div
          className={isBusSelected ? "selected" : "notSelected"}
          onClick={() => setIsBusSelected(true)}
        >
          BUS
        </div>
        <div
          className={isBusSelected ? "notSelected" : "selected"}
          onClick={() => setIsBusSelected(false)}
        >
          TRAIN
        </div>
      </div>
      {busServices !== null &&
        typeof busServices === "object" &&
        isBusSelected &&
        Object.keys(busServices).map((service, idx) => (
          <Service
            key={idx}
            services={busServices}
            service={service}
            isOpen={isBusDropdownOpen}
            handleDropdown={handleBusDropdown}
            isBusSelected={isBusSelected}
          />
        ))}
      {trainServices !== null &&
        typeof trainServices === "object" &&
        !isBusSelected &&
        Object.keys(trainServices).map((service, idx) => (
          <Service
            key={idx}
            services={trainServices}
            service={service}
            isOpen={isTrainDropdownOpen}
            handleDropdown={handleTrainDropdown}
            isBusSelected={isBusSelected}
          />
        ))}
    </>
  );
};

export default All;

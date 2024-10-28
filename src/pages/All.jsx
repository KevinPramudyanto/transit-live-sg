import React, { useState } from "react";
import Service from "../components/Service";
import { busServices } from "../data/busServices.js";
import { trainServices } from "../data/trainServices.js";

const All = () => {
  const [isBusSelected, setIsBusSelected] = useState(true);
  const [isBusDropdownOpen, setIsBusDropdownOpen] = useState({});
  const [isTrainDropdownOpen, setIsTrainDropdownOpen] = useState({});
  const [search, setSearch] = useState("");

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

      <div className="searchContainer">
        <label htmlFor="search">{isBusSelected ? "Bus No" : "Route"} : </label>
        <input
          list="searches"
          className="search"
          id="search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="start typing to filter..."
        />
        <datalist id="searches">
          {busServices !== null &&
            typeof busServices === "object" &&
            isBusSelected &&
            Object.keys(busServices)
              .filter(
                (service) =>
                  search.length >= 2 &&
                  service.toLowerCase().includes(search.toLowerCase())
              )
              .map((service, idx) => <option key={idx} value={service} />)}
          {trainServices !== null &&
            typeof trainServices === "object" &&
            !isBusSelected &&
            Object.keys(trainServices)
              .filter(
                (service) =>
                  search.length >= 2 &&
                  service.toLowerCase().includes(search.toLowerCase())
              )
              .map((service, idx) => <option key={idx} value={service} />)}
        </datalist>
      </div>

      {busServices !== null &&
        typeof busServices === "object" &&
        isBusSelected &&
        Object.keys(busServices)
          .filter((service) =>
            service.toLowerCase().includes(search.toLowerCase())
          )
          .map((service, idx) => (
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
        Object.keys(trainServices)
          .filter((service) =>
            service.toLowerCase().includes(search.toLowerCase())
          )
          .map((service, idx) => (
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

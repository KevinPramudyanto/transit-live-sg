import React, { useState } from "react";
import Service from "../components/Service";
import { busServices } from "../data/busServices.js";
import { trainServices } from "../data/trainServices.js";
import emptyFolder from "../assets/emptyFolder.png";
import loupe from "../assets/loupe.png";

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
      <div className="filterContainer">
        <div>Filter By :</div>
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
        <input
          list="searches"
          className="search"
          id="search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={"Search By " + (isBusSelected ? "Bus No" : "Route")}
          maxLength="10"
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
        <label htmlFor="search" title="Search">
          <img src={loupe} alt="loupe" />
        </label>
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
      {busServices !== null &&
        typeof busServices === "object" &&
        isBusSelected &&
        Object.keys(busServices).filter((service) =>
          service.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <div className="noContainer">
            <div>
              <img
                src={emptyFolder}
                alt="empty search"
                title="No matches found"
              />
            </div>
            <div>No matches found</div>
          </div>
        )}
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
      {trainServices !== null &&
        typeof trainServices === "object" &&
        !isBusSelected &&
        Object.keys(trainServices).filter((service) =>
          service.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <div className="noContainer">
            <div>
              <img
                src={emptyFolder}
                alt="empty search"
                title="No matches found"
              />
            </div>
            <div>No matches found</div>
          </div>
        )}
    </>
  );
};

export default All;

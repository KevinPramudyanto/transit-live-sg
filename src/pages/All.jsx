import React from "react";
import Service from "../components/Service";
import { busServices } from "../components/busServices.js";

const All = () => {
  return (
    <>
      {busServices !== null &&
        typeof busServices === "object" &&
        Object.keys(busServices).map((busService, idx) => (
          <Service
            key={idx}
            busServices={busServices}
            busService={busService}
          />
        ))}
    </>
  );
};

export default All;

import React from "react";
import Service from "../components/Service";
import { busServices } from "../components/busServices.js";

const All = () => {
  return (
    <>
      {busServices !== null &&
        typeof busServices === "object" &&
        Object.keys(busServices).map((service, idx) => (
          <Service key={idx} busServices={busServices} service={service} />
        ))}
    </>
  );
};

export default All;

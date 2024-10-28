import React from "react";
import { busStops } from "../data/busStops.js";
import { Link } from "react-router-dom";

const Stop = ({ service, stop }) => {
  return (
    <Link to={"/all/bus/" + service + "/" + stop}>
      <div className="stop">
        <div className="stopName">
          {(typeof busStops?.[stop]?.[2] === "string" &&
            busStops?.[stop]?.[2]) ||
            "NA"}
        </div>

        <div className="stopCode">
          {stop}{" "}
          {(typeof busStops?.[stop]?.[3] === "string" &&
            busStops?.[stop]?.[3]) ||
            "NA"}
        </div>
      </div>
    </Link>
  );
};

export default Stop;

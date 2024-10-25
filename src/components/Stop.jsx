import React from "react";
import { busStops } from "./busStops.js";
import { Link } from "react-router-dom";

const Stop = ({ busService, stop }) => {
  return (
    <Link to={"/all/" + busService + "/" + stop}>
      <div className="stop">
        <div className="stopName">{busStops[stop][2]}</div>
        <div className="stopCode">
          {stop} {busStops[stop][3]}
        </div>
      </div>
    </Link>
  );
};

export default Stop;

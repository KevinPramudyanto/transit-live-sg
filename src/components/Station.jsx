import React from "react";
import { trainStops } from "../data/trainStops.js";
import { Link } from "react-router-dom";

const Station = ({ service, stop }) => {
  return (
    <Link to={"/all/train/" + service + "/" + stop}>
      <div className="stop">
        <div className="stopName">
          {(typeof trainStops?.[stop] === "string" && trainStops?.[stop]) ||
            "NA"}
        </div>

        <div className="stopCode">{stop}</div>
      </div>
    </Link>
  );
};

export default Station;

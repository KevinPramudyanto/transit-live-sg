import React from "react";
import { busStops } from "../data/busStops.js";
import { trainStops } from "../data/trainStops.js";
import { Link } from "react-router-dom";
import bin from "../assets/bin.png";

const Bookmark = ({ record, deleteBookmark }) => {
  return (
    <>
      <div className="bookmarkDescription">
        {record?.fields?.description || "General Purpose"}
      </div>
      <div className="bookmarkContainer">
        <Link
          to={
            "/all/" +
            record.fields.mode +
            "/" +
            record.fields.service +
            "/" +
            record.fields.stop
          }
        >
          <div className="bookmark">
            <div>
              <div className="label">
                {record.fields.mode === "bus" && "Bus No"}
                {record.fields.mode === "train" && "Route"}
              </div>
              <div className="service">{record.fields.service}</div>
            </div>
            <div>
              <div className="stopName">
                {record.fields.mode === "bus" &&
                  ((typeof busStops?.[record.fields.stop]?.[2] === "string" &&
                    busStops?.[record.fields.stop]?.[2]) ||
                    "NA")}
                {record.fields.mode === "train" &&
                  ((typeof trainStops?.[record.fields.stop] === "string" &&
                    trainStops?.[record.fields.stop]) ||
                    "NA")}
              </div>
              <div className="stopCode">
                {record.fields.stop}{" "}
                {record.fields.mode === "bus" &&
                  ((typeof busStops?.[record.fields.stop]?.[3] === "string" &&
                    busStops?.[record.fields.stop]?.[3]) ||
                    "NA")}
              </div>
            </div>
          </div>
        </Link>

        <img
          src={bin}
          alt="delete"
          onClick={() => deleteBookmark(record.id)}
          title="Delete"
        />
      </div>
    </>
  );
};

export default Bookmark;

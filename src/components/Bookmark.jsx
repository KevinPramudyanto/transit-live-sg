import React from "react";
import { busStops } from "../components/busStops.js";
import { Link } from "react-router-dom";
import bin from "../assets/bin.png";

const Bookmark = ({ record, deleteBookmark }) => {
  return (
    <div className="bookmarkContainer">
      <Link to={"/all/bus/" + record.fields.service + "/" + record.fields.stop}>
        <div className="bookmark">
          <div>
            <div className="label">Bus No</div>
            <div className="service">{record.fields.service}</div>
          </div>
          <div>
            <div className="stopName">
              {(typeof busStops?.[record.fields.stop]?.[2] === "string" &&
                busStops?.[record.fields.stop]?.[2]) ||
                "NA"}
            </div>
            <div className="stopCode">
              {record.fields.stop}{" "}
              {(typeof busStops?.[record.fields.stop]?.[3] === "string" &&
                busStops?.[record.fields.stop]?.[3]) ||
                "NA"}
            </div>
          </div>
        </div>
      </Link>
      <img src={bin} alt="delete" onClick={() => deleteBookmark(record.id)} />
    </div>
  );
};

export default Bookmark;

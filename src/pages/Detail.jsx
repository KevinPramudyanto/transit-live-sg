import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { busStops } from "../components/busStops.js";
import bookmark from "../assets/bookmark.png";

const Detail = () => {
  const [buses, setBuses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  let nextDuration = "NA";
  let next2Duration = "NA";
  let next3Duration = "NA";
  let nextLoad = "green";
  let next2Load = "green";
  let next3Load = "green";

  const getBuses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://arrivelah2.busrouter.sg/?id=" + params.stop
      );
      if (!res.ok) {
        throw new Error("Server Error");
      }
      const data = await res.json();
      setBuses(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBuses();
  }, []);

  if (!isLoading) {
    for (const item of (Array.isArray(buses?.services) && buses?.services) ||
      []) {
      if (item?.no === params.service) {
        nextDuration =
          (typeof item?.next?.duration_ms === "number" &&
            item?.next?.duration_ms) ||
          "NA";
        if (typeof nextDuration === "number") {
          nextDuration =
            Math.floor(nextDuration / 60000) > 0
              ? Math.floor(nextDuration / 60000)
              : 0;
        }
        next2Duration =
          (typeof item?.next2?.duration_ms === "number" &&
            item?.next2?.duration_ms) ||
          "NA";
        if (typeof next2Duration === "number") {
          next2Duration =
            Math.floor(next2Duration / 60000) > 0
              ? Math.floor(next2Duration / 60000)
              : 0;
        }
        next3Duration =
          (typeof item?.next3?.duration_ms === "number" &&
            item?.next3?.duration_ms) ||
          "NA";
        if (typeof next3Duration === "number") {
          next3Duration =
            Math.floor(next3Duration / 60000) > 0
              ? Math.floor(next3Duration / 60000)
              : 0;
        }

        nextLoad = item?.next?.load || "green";
        if (nextLoad === "SDA") {
          nextLoad = "yellow";
        } else if (nextLoad === "LSD") {
          nextLoad = "red";
        } else {
          nextLoad = "green";
        }

        next2Load = item?.next2?.load || "green";
        if (next2Load === "SDA") {
          next2Load = "yellow";
        } else if (next2Load === "LSD") {
          next2Load = "red";
        } else {
          next2Load = "green";
        }

        next3Load = item?.next3?.load || "green";
        if (next3Load === "SDA") {
          next3Load = "yellow";
        } else if (next3Load === "LSD") {
          next3Load = "red";
        } else {
          next3Load = "green";
        }

        break;
      }
    }
  }

  const handleClick = () => {
    getBuses();
  };

  return (
    <>
      <div className="detail">
        <div className="busNo">Bus No. {params.service}</div>
        <img src={bookmark} alt="bookmark" />
        <div>
          <div className="stopName">
            {(typeof busStops?.[params.stop]?.[2] === "string" &&
              busStops?.[params.stop]?.[2]) ||
              "NA"}
          </div>
          <div className="stopCode">
            {params.stop}{" "}
            {(typeof busStops?.[params.stop]?.[3] === "string" &&
              busStops?.[params.stop]?.[3]) ||
              "NA"}
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="duration" onClick={handleClick}>
          <div className="next" style={{ color: nextLoad }}>
            {nextDuration}
          </div>
          <div className="subsequent">
            <span style={{ color: next2Load }}>{next2Duration}</span>
            {" , "}
            <span style={{ color: next3Load }}>{next3Duration}</span>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="duration">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Detail;

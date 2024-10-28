import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { busStops } from "../data/busStops.js";
import { trainStops } from "../data/trainStops.js";
import bookmark from "../assets/bookmark.png";

const Detail = () => {
  const [buses, setBuses] = useState({});
  const [trains, setTrains] = useState({});
  const [isGetLoading, setIsGetLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let nextDuration = "NA";
  let next2Duration = "NA";
  let next3Duration = "NA";
  let nextLoad = "green";
  let next2Load = "green";
  let next3Load = "green";

  const getBuses = async () => {
    setIsGetLoading(true);
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
    setIsGetLoading(false);
  };

  const getTrains = async () => {
    setIsGetLoading(true);
    try {
      const res = await fetch("https://sg-rail-crowd.cheeaun.workers.dev");
      if (!res.ok) {
        throw new Error("Server Error");
      }
      const data = await res.json();
      setTrains(data);
    } catch (error) {
      console.error(error);
    }
    setIsGetLoading(false);
  };

  useEffect(() => {
    if (params.mode === "bus") {
      getBuses();
    } else if (params.mode === "train") {
      getTrains();
    } else {
      navigate("/404");
    }
  }, []);

  if (!isGetLoading && params.mode === "bus") {
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

  if (!isGetLoading && params.mode === "train") {
    for (const item of (Array.isArray(trains?.data) && trains?.data) || []) {
      if (item?.station === params.stop) {
        nextLoad = item?.crowdLevel || "green";
        if (nextLoad === "m") {
          nextLoad = "yellow";
        } else if (nextLoad === "h") {
          nextLoad = "red";
        } else {
          nextLoad = "green";
        }
        break;
      }
    }
    next2Load = nextLoad;
    next3Load = nextLoad;
  }

  const postBookmark = async () => {
    setIsPostLoading(true);
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/app5KhAUmqFIYqpKc/bookmarks",
        {
          method: "POST",
          headers: {
            Authorization: import.meta.env.VITE_AUTHORIZATION,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  service: params.service,
                  stop: params.stop,
                  mode: params.mode,
                },
              },
            ],
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Server Error");
      }
      navigate("/bookmarks");
    } catch (error) {
      console.error(error);
    }
    setIsPostLoading(false);
  };

  return (
    <>
      <div className="detail">
        <div className="busNo">
          {params.mode === "bus" && "Bus No. "}
          {params.mode === "train" && "Route "}
          {params.service}
        </div>
        {!isPostLoading && (
          <img src={bookmark} alt="bookmark" onClick={postBookmark} />
        )}
        {isPostLoading && <div className="smallLoader"></div>}
        <div>
          <div className="stopName">
            {params.mode === "bus" &&
              ((typeof busStops?.[params.stop]?.[2] === "string" &&
                busStops?.[params.stop]?.[2]) ||
                "NA")}
            {params.mode === "train" &&
              ((typeof trainStops?.[params.stop] === "string" &&
                trainStops?.[params.stop]) ||
                "NA")}
          </div>
          <div className="stopCode">
            {params.stop}{" "}
            {params.mode === "bus" &&
              ((typeof busStops?.[params.stop]?.[3] === "string" &&
                busStops?.[params.stop]?.[3]) ||
                "NA")}
          </div>
        </div>
      </div>
      {!isGetLoading && (
        <div
          className="duration"
          onClick={params.mode === "bus" ? getBuses : getTrains}
        >
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
      {isGetLoading && (
        <div className="duration">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Detail;

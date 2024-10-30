import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateModal from "../components/UpdateModal";
import { busStops } from "../data/busStops.js";
import { trainStops } from "../data/trainStops.js";
import bookmark from "../assets/bookmark.png";

const Detail = () => {
  const [buses, setBuses] = useState({});
  const [trains, setTrains] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let nextDuration = "NA";
  let next2Duration = "NA";
  let next3Duration = "NA";
  let greenColor = "rgb(0,255,0)";
  let yellowColor = "rgb(255, 255, 0)";
  let redColor = "rgb(255, 127, 127)";
  let nextLoad = greenColor;
  let next2Load = greenColor;
  let next3Load = greenColor;

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

  const getTrains = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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

  if (!isLoading && params.mode === "bus") {
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

        nextLoad = item?.next?.load || greenColor;
        if (nextLoad === "SDA") {
          nextLoad = yellowColor;
        } else if (nextLoad === "LSD") {
          nextLoad = redColor;
        } else {
          nextLoad = greenColor;
        }

        next2Load = item?.next2?.load || greenColor;
        if (next2Load === "SDA") {
          next2Load = yellowColor;
        } else if (next2Load === "LSD") {
          next2Load = redColor;
        } else {
          next2Load = greenColor;
        }

        next3Load = item?.next3?.load || greenColor;
        if (next3Load === "SDA") {
          next3Load = yellowColor;
        } else if (next3Load === "LSD") {
          next3Load = redColor;
        } else {
          next3Load = greenColor;
        }

        break;
      }
    }
  }

  if (!isLoading && params.mode === "train") {
    for (const item of (Array.isArray(trains?.data) && trains?.data) || []) {
      if (item?.station === params.stop) {
        nextLoad = item?.crowdLevel || greenColor;
        if (nextLoad === "m") {
          nextLoad = yellowColor;
        } else if (nextLoad === "h") {
          nextLoad = redColor;
        } else {
          nextLoad = greenColor;
        }
        break;
      }
    }
    next2Load = nextLoad;
    next3Load = nextLoad;
  }

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          service={params.service}
          stop={params.stop}
          mode={params.mode}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className="detail">
        <div className="busNo">
          {params.mode === "bus" && "Bus No. "}
          {params.mode === "train" && "Route "}
          {params.service}
        </div>
        <img
          src={bookmark}
          alt="bookmark"
          onClick={() => setShowUpdateModal(true)}
          title="Open Modal"
        />
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

      {!isLoading && (
        <div
          className="duration"
          onClick={params.mode === "bus" ? getBuses : getTrains}
        >
          <div className="next" style={{ color: nextLoad }} title="Next">
            {nextDuration}
          </div>
          <div className="subsequent">
            <span style={{ color: next2Load }} title="Subsequent">
              {next2Duration}
            </span>
            {" , "}
            <span style={{ color: next3Load }} title="Subsequent">
              {next3Duration}
            </span>
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

import React, { useEffect, useState } from "react";

const All = () => {
  const [busServices, setBusServices] = useState({});
  const [busStops, setBusStops] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [isLoading2, setIsLoading2] = useState();

  const getBusServices = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("https://data.busrouter.sg/v1/services.min.json");

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setBusServices(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const getBusStops = async () => {
    setIsLoading2(true);

    try {
      const res = await fetch("https://data.busrouter.sg/v1/stops.min.json");

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setBusStops(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading2(false);
  };

  useEffect(() => {
    getBusServices();
    getBusStops();
  }, []);

  return (
    <>
      <div className="busServices">
        {!isLoading &&
          !isLoading2 &&
          Object.keys(busServices).map((busService, idx) => (
            <div key={idx}>
              <div className="busService">
                <span className="busNumber">{busService}</span>
                <span className="busRoute">{busServices[busService].name}</span>
              </div>
              {busServices[busService].routes[0].map((busRoute, idx1) => (
                <div key={idx1}>
                  {busRoute} {busStops[busRoute][2]}
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default All;

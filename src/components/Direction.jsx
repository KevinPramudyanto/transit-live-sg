import React from "react";
import Stop from "./Stop.jsx";
import Station from "./Station.jsx";

const Direction = ({ service, direction, isBusSelected }) => {
  return (
    <div>
      {direction.map(
        (stop, idx) =>
          typeof stop === "string" &&
          (isBusSelected ? (
            <Stop key={idx} service={service} stop={stop} />
          ) : (
            <Station key={idx} service={service} stop={stop} />
          ))
      )}
    </div>
  );
};

export default Direction;

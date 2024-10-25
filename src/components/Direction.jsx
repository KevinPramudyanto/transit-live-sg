import React from "react";
import Stop from "./Stop.jsx";

const Direction = ({ busService, direction }) => {
  return (
    <div>
      {direction.map((stop, idx) => (
        <Stop key={idx} busService={busService} stop={stop} />
      ))}
    </div>
  );
};

export default Direction;

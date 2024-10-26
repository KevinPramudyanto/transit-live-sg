import React from "react";
import Stop from "./Stop.jsx";

const Direction = ({ busService, direction }) => {
  return (
    <div>
      {direction.map(
        (stop, idx) =>
          typeof stop === "string" && (
            <Stop key={idx} busService={busService} stop={stop} />
          )
      )}
    </div>
  );
};

export default Direction;

import React from "react";
import Stop from "./Stop.jsx";

const Direction = ({ service, direction }) => {
  return (
    <div>
      {direction.map(
        (stop, idx) =>
          typeof stop === "string" && (
            <Stop key={idx} service={service} stop={stop} />
          )
      )}
    </div>
  );
};

export default Direction;

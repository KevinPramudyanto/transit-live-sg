import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const OverLay = (props) => {
  const [isPostLoading, setIsPostLoading] = useState(false);
  const navigate = useNavigate();

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
                  service: props.service,
                  stop: props.stop,
                  mode: props.mode,
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
    <div className="modal">
      {isPostLoading && <div className="smallLoader"></div>}
      <button onClick={postBookmark}>post</button>
      <button onClick={() => props.setShowUpdateModal(false)}>cancel</button>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          service={props.service}
          stop={props.stop}
          mode={props.mode}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;

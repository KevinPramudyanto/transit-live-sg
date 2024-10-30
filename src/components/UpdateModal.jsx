import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const OverLay = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef();
  const navigate = useNavigate();

  const postBookmark = async () => {
    setIsLoading(true);
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
                  description: descriptionRef.current.value,
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
    setIsLoading(false);
  };

  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="title">
          <label htmlFor="description">
            {props.mode === "bus" && "Bus No. "}
            {props.mode === "train" && "Route "}
            {props.service} / {props.stop}
          </label>
          <div
            className="closeBtn"
            onClick={() => props.setShowUpdateModal(false)}
            title="Close Modal"
          >
            X
          </div>
        </div>
        <input
          id="description"
          type="text"
          ref={descriptionRef}
          placeholder="Enter your description here..."
          maxLength="50"
        />
        {!isLoading && (
          <div className="submitBtn" onClick={postBookmark}>
            ADD TO BOOKMARKS
          </div>
        )}
        {isLoading && <div className="submitting">ADDING IN PROGRESS...</div>}
      </div>
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

import React, { useEffect, useState } from "react";
import { busStops } from "../components/busStops.js";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getBookmarks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/app5KhAUmqFIYqpKc/bookmarks",
        { headers: { Authorization: import.meta.env.VITE_AUTHORIZATION } }
      );
      if (!res.ok) {
        throw new Error("error");
      }
      const data = await res.json();
      setBookmarks(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <>
      {!isLoading &&
        bookmarks.records.map((record) => (
          <Link
            key={record.id}
            to={"/all/" + record.fields.service + "/" + record.fields.stop}
          >
            <div className="bookmark">
              <div>
                <div className="label">Bus No</div>
                <div className="service">{record.fields.service}</div>
              </div>
              <div>
                <div className="stopName">
                  {busStops[record.fields.stop][2]}
                </div>
                <div className="stopCode">
                  {record.fields.stop} {busStops[record.fields.stop][3]}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default Bookmarks;

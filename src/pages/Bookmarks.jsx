import React, { useEffect, useState } from "react";
import Bookmark from "../components/Bookmark.jsx";

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
        throw new Error("Server Error");
      }
      const data = await res.json();
      setBookmarks(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const deleteBookmark = async (id) => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/app5KhAUmqFIYqpKc/bookmarks/" + id,
        {
          method: "DELETE",
          headers: { Authorization: import.meta.env.VITE_AUTHORIZATION },
        }
      );
      if (!res.ok) {
        throw new Error("Server Error");
      }
      getBookmarks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <>
      {!isLoading &&
        Array.isArray(bookmarks.records) &&
        bookmarks.records.map((record, idx) => (
          <Bookmark key={idx} record={record} deleteBookmark={deleteBookmark} />
        ))}
      {isLoading && <div className="loader"></div>}
    </>
  );
};

export default Bookmarks;

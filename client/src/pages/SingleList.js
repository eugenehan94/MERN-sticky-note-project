import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import "../css/SingleList.css";
const SingleList = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const fetchSingleData = useCallback(async () => {
    const response = await fetch(`/api/v1/list/${id}`);
    const data = await response.json();

    setData(data);
    setLoading(false);
  }, [id]);

  const patchData = async (input) => {
    if (input === "") {
      return setErrorMessage("Input must be provided");
    }
    const response = await fetch(`/api/v1/list/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    const data = response.json();
    fetchSingleData();

    setInput(data);
    return setErrorMessage("Change successful");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchData(input);
  };
  useEffect(() => {
    fetchSingleData();
  }, [fetchSingleData]);

  useEffect(() => {
    const timeout = setTimeout(() => setErrorMessage(""), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [errorMessage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="singleSticky-container">
      <h1>Edit Sticky Note</h1>

      <Link to="/" className="home-btn">
        Home
      </Link>

      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="name"
          defaultValue={data.name}
          onChange={(e) => setInput(e.target.value)}
          cols="50"
          rows="15"
        ></textarea>
        <div className="input-errorMessage">
          {errorMessage && `${errorMessage}`}
        </div>
        <div>
          <input type="submit" value="Submit" className="edit-submit-btn" />
        </div>
      </form>
    </div>
  );
};

export default SingleList;

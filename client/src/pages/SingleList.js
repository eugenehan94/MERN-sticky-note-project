import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/SingleList.css";
const SingleList = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const fetchSingleData = async () => {
    const response = await fetch(`/api/v1/list/${id}`);
    const data = await response.json();

    setData(data);
    setLoading(false);
  };
  const patchData = async (input) => {
    if (input === input) {
      return setErrorMessage("Input was not changed");
    }
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchData(input);
  };
  useEffect(() => {
    fetchSingleData();
  }, []);

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 3000);
  }, [errorMessage]);

  if (loading) {
    return (
      <div>
        <h1>Loading results</h1>
      </div>
    );
  }

  return (
    <div className="singleSticky-container">
      <h1>Edit Sticky Note</h1>
      <Link to="/">Home</Link>

      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="name"
          defaultValue={data.name}
          onChange={(e) => setInput(e.target.value)}
          cols="50"
          rows="15"
        ></textarea>
        <div>{errorMessage && `${errorMessage}`}</div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SingleList;

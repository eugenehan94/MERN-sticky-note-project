import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./css/App.css";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Call Node to get all data from MongoDB
  const fetchData = async () => {
    const response = await fetch("/api/v1/list");
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  //Call Node to POST data to MongoDB
  const addData = async (input) => {
    if (input === "") {
      return setErrorMessage("Input must be provided");
    }

    await fetch("/api/v1/list", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    // const data = await response.json();
    // console.log(data.msg.errors.name.message);

    fetchData();
    setInput("");
    return setErrorMessage("Successfully added");
  };

  //Call Node to DELETE data to MondoDB
  const deleteData = async (id) => {
    await fetch(`/api/v1/list/${id}`, { method: "DELETE" });
    // const data = await response.json();
    fetchData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData(input);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div>
      <div className="title">
        <h1>Bulletin Board</h1>
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g Enter Message"
            cols="30"
            rows="5"
          ></textarea>
          <div className="input-errorMessage">
            {errorMessage && `${errorMessage}`}
          </div>
          <div className="input-btn-wrapper">
            <input type="submit" value="Add" className="input-btn" />
          </div>
        </form>
      </div>
      <div className="stickyNote-container">
        {data.list
          .map((list, i) => {
            return (
              <div key={i} className="stickyNote">
                <div className="stickyNote-btn-wrapper">
                  <IconContext.Provider
                    value={{ className: "stickyNote-edit-btn" }}
                  >
                    <Link to={`/SingleList/${list._id}`}>
                      <AiFillEdit />
                    </Link>
                  </IconContext.Provider>
                  <IconContext.Provider
                    value={{ className: "stickyNote-delete-btn" }}
                  >
                    <button onClick={() => deleteData(list._id)}>
                      <AiFillDelete />
                    </button>
                  </IconContext.Provider>
                </div>

                <p>{list.name}</p>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default App;

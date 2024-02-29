import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>Your Neighborhood Hair Heroes</h1>
          <div className="search">
            {/* <div className="img"><img src="./search.png" alt="" /></div> */}
            <div className="searchInput">
              <input
                type="text"
                placeholder="Enter your search"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span><b>Popular:</b></span>
            <button>Location</button>
            <button>Rating</button>
            <button>Availability</button>
            <button>Price range</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;

import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Image() {
  const history = useHistory();
  const [posters, setPosters] = useState([]);

  const openImage = (poster) => {
    history.push({
      pathname: "/Poster",
      state: { posters: poster },
    });
  };
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const handleImageClick = (poster) => {
    openImage(poster);
  };

  useEffect(() => {
    axiosInstance
      .get("/poster")
      .then((response) => {
        setPosters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h3>
          Photo <span>Gallery</span>
        </h3>
      </div>
      <div className="box">
        {posters.map((poster) => (
          <li key={poster._id}>
            <img
              src={poster.pics}
              alt={poster.input}
              onClick={() => handleImageClick(poster)}
            />
          </li>
        ))}
      </div>
    </div>
  );
}
export default Image;

import React from "react";
import { useHistory } from "react-router-dom";
import Poster from "./Poster";

function Image() {
  const history = useHistory();
  const imageUrl =
    "https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg";

  const openImage = () => {
    console.log("fff");
    history.push({
      pathname: "/Poster",
      state: { image: imageUrl },
    });
  };

  return (
    <div>
      <img
        align="left"
        src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
        width="400"
        height="500"
        onClick={() => openImage()}
      ></img>
      <img
        align="left"
        src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
        width="400"
        height="500"
        onClick={() => openImage()}
      ></img>
    </div>
  );
}

export default Image;

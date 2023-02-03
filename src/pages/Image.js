import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
  useEffect(() => {
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    let cookieValue = getCookie("token");
    console.log(cookieValue);
  }, []);
  return (
    <div>
      <img
        align="left"
        src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
        width="400"
        height="500"
        alt=""
        onClick={() => openImage()}
      ></img>
      <img
        align="left"
        src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
        width="400"
        height="500"
        alt=""
        onClick={() => openImage()}
      ></img>
    </div>
  );
}

export default Image;

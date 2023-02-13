import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
function Image() {
  const { setUser } = ChatState();
  const history = useHistory();
  const imageUrl =
    "https://images.pexels.com/photos/15439947/pexels-photo-15439947.jpeg";

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
    <div class="container">
      <div class="heading">
        <h3>
          Photo <span>Gallery</span>
        </h3>
      </div>
      <div class="box">
        <div class="dream">
          <img
            src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
            onClick={() => openImage()}
          />
          <img src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg" />
        </div>
        <div class="dream">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
            onClick={() => openImage()}
          />
          <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </div>
      </div>
    </div>
  );
}
export default Image;

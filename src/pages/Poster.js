import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useState, useRef } from "react";
import { ChatState } from "../Context/ChatProvider";

import axios from "axios";

function Poster(props) {
  useEffect(() => {
    var canvas = document.getElementById("myCanvas"),
      context = canvas.getContext("2d");

    const base_image = document.getElementById("scream");
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0);

      context.font = "20px Arial";
      const textWidth = context.measureText("Hello World").width;

      context.fillText("Hello Worlddddddddddd", 10, 60, textWidth);
    };
  }, []);

  var download = function () {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = document.getElementById("myCanvas").toDataURL();
    link.click();
  };

  return (
    <div>
      <p>Image to use:</p>
      <img
        id="scream"
        width={220}
        height={277}
        src={props.location.state.image}
        alt="The Scream"
        crossOrigin="anonymous"
      />
      <p>Canvas:</p>
      <canvas
        id="myCanvas"
        width={240}
        height={297}
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <p></p>
      <a id="download" onClick={download}>
        Download to myImage.jpg
      </a>
    </div>
  );
}

export default Poster;

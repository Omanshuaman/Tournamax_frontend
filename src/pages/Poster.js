import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useState, useRef } from "react";
import { ChatState } from "../Context/ChatProvider";

import axios from "axios";
// const url = "https://tournamax-testing.onrender.com";  //for production

function Poster() {
  const [title, setTitle] = useState(null);
  const { poster, setPoster } = ChatState();

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
    console.log(link.href);
    link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      };

      const res = await axios.post(
        //url +
        "/api/poster",
        {
          input: title,
        },
        config
      );
      setPoster([...poster, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  return (
    <div>
      <p>Image to use:</p>
      <img
        id="scream"
        width={220}
        height={277}
        src="https://cdn.pixabay.com/photo/2016/03/21/23/25/link-1271843__480.png"
        alt="The Scream"
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
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit" className="submitButton">
            Add Pin
          </button>
        </form>
      </div>
      <div>
        <button>Hello</button>
      </div>
    </div>
  );
}

export default Poster;

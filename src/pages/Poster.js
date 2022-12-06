import React from "react";
import { useEffect, useState } from "react";
import test from "../images/download.jpeg";
import { ChatState } from "../Context/ChatProvider";

import axios from "axios";
// const url = "https://tournamax-testing.onrender.com";

function Poster() {
  const [title, setTitle] = useState(null);
  const { poster, setPoster } = ChatState();

  useEffect(() => {
    var canvas = document.getElementById("myCanvas"),
      context = canvas.getContext("2d");

    const base_image = document.getElementById("scream");
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0);
      context.font = "30px Arial";
      context.fillText("Hello World", 10, 50);
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
    const newPoster = {
      input: title,
    };

    try {
      const res = await axios.post("/api/poster", newPoster);
      setPoster([...poster, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>Image to use:</p>
      <img id="scream" width={220} height={277} src={test} alt="The Scream" />
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
    </div>
  );
}

export default Poster;

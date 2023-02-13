import React from "react";
import { useEffect, useRef, useState } from "react";
import MyFont from "../fonts/MyFont.ttf";
import GameofThrones from "../fonts/GameofThrones.ttf";

function Poster(props) {
  const canvasRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState([]);

  useEffect(() => {
    setPhotoUrl(props.location.state.image);
  }, [props.location.state.image]);

  useEffect(() => {
    const canvas = canvasRef.current,
      context = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = photoUrl;

    image.onload = function () {
      let aspectRatio = image.height / image.width;
      let canvasWidth = canvas.width;
      let canvasHeight = canvas.width * aspectRatio;

      if (canvasHeight > canvas.height) {
        canvasHeight = canvas.height;
        canvasWidth = canvas.height / aspectRatio;
      }
      context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      const font = new FontFace("GameofThrones", `url(${GameofThrones})`);
      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        context.font = "75px 'GameofThrones'";
        const textMetrics = context.measureText("Hello Worldd");

        if (textMetrics.width) {
          const gradient = context.createLinearGradient(
            canvasWidth / 4,
            canvasHeight / 2.5,
            canvasWidth / 4 + textMetrics.width,
            canvasHeight / 2.5
          );

          gradient.addColorStop(0, "#ffff00");
          gradient.addColorStop(1, "#ffff99");

          context.fillStyle = gradient;

          context.textAlign = "center";
          context.fillText(
            "Hello World vdfvdf",
            canvasWidth / 2,
            canvasHeight / 1.45,
            textMetrics.width
          );

          // const lineHeight = context.measureText("M").width * 1.5;
          // const lines = "Hello World\nNew line after World".split("\n");

          // for (let i = 0; i < lines.length; i++) {
          //   context.fillText(
          //     lines[i],
          //     canvasWidth / 6,
          //     canvasHeight / 1.2 + i * lineHeight,
          //     textMetrics.width
          //   );
          // }
        }
      });
    };
  }, [photoUrl]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "my-canvas.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={880}
        height={1136}
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <p></p>
      <button onClick={handleDownload}>Download Canvas</button>
    </div>
  );
}
export default Poster;

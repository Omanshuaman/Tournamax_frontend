import React from "react";
import { useEffect, useRef, useState } from "react";
import { ChatState } from "../Context/ChatProvider";

function Poster(props) {
  const canvasRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState([]);
  const propImage = props.location.state.posters;
  const { details, setDetails } = ChatState();

  useEffect(() => {
    setPhotoUrl(propImage);
    console.log(propImage);
  }, [props]);

  useEffect(() => {
    const posterDetails = JSON.parse(localStorage.getItem("posterdetails"));
    setDetails(posterDetails);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current,
      context = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = photoUrl.pics;

    const image1 = new Image();
    image1.crossOrigin = "anonymous";
    image1.src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${details.long},${details.lat},14.25,0,60/400x300?access_token=${process.env.REACT_APP_MAPBOX}`;

    image.onload = function () {
      let aspectRatio = image.height / image.width;
      let canvasWidth = canvas.width;
      let canvasHeight = canvas.width * aspectRatio;
      if (canvasHeight > canvas.height) {
        canvasHeight = canvas.height;
        canvasWidth = canvas.height / aspectRatio;
      }
      context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      const font = new FontFace(photoUrl.font, `url(${photoUrl.font})`);
      const font1 = new FontFace(photoUrl.font1, `url(${photoUrl.font1})`);

      // Load the texture image
      const textureImg = new Image();
      textureImg.crossOrigin = "anonymous";

      textureImg.src = `${photoUrl.fontBackground}`;
      //  textureImg.src = `https://images.pexels.com/photos/4195514/pexels-photo-4195514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;

      // Wait for the image to load
      textureImg.onload = function () {
        // Create a pattern from the image
        const pattern = context.createPattern(textureImg, "repeat");
        // Store original global alpha value

        font.load().then((loadedFont) => {
          // Add loaded font to document
          document.fonts.add(loadedFont);

          context.fillStyle = `rgba(${photoUrl.fontFillStyleR}, ${photoUrl.fontFillStyleG}, ${photoUrl.fontFillStyleB}, ${photoUrl.fontFillStyleA})`; // set the fill color to yellow with 50% opacity
          const originalGlobalFillStyle = context.fillStyle;
          context.font = `${photoUrl.fontsize} '${photoUrl.font}'`;
          const textMetrics = context.measureText(`${details.tournamentName}`);

          // Set text to display and capitalize words
          context.textAlign = "center";
          const text = `${details.tournamentName}`;
          const capitalizedWords = text.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });

          if (textMetrics.width) {
            context.shadowColor = `${photoUrl.fontShadowColor}`;
            const originalShadowBlur = context.shadowBlur;

            context.shadowBlur = photoUrl.fontShadowBlur;
            // context.fillStyle = `rgba(${photoUrl.fontFillStyleR}, ${photoUrl.fontFillStyleG}, ${photoUrl.fontFillStyleB}, ${photoUrl.fontFillStyleA})`; // set the fill color to yellow with 50% opacity
            // Set the fill style to the pattern
            context.fillStyle = pattern;
            // Set line height and initialize array for lines of text
            const lineHeight = context.measureText("M").width * 1.35; // adjust line height as desired
            const lines = [];

            // Set the number of words to display per line
            const wordsPerLine = photoUrl.fontNumberofLines;

            // Loop over words in text and split into lines of specified length
            let currentLine = "";
            for (let i = 0; i < capitalizedWords.length; i++) {
              if (i % wordsPerLine === wordsPerLine - 1) {
                // Add the last word to the current line and add it to the lines array
                currentLine += capitalizedWords[i];
                lines.push(currentLine);
                // Start a new line
                currentLine = "";
              } else {
                // Add the word to the current line with a space
                currentLine += capitalizedWords[i] + " ";
              }
            }

            // If there are any words remaining on the last line, add it to the lines array
            if (currentLine !== "") {
              lines.push(currentLine);
            }

            const y = canvasHeight / 1.55;
            for (let i = 0; i < lines.length; i++) {
              context.fillText(
                lines[i],
                canvasWidth / photoUrl.fontCanvasWidth,
                y + i * lineHeight - photoUrl.fontCanvasHeight,
                textMetrics.width
              );
            }
            // Reset global alpha to its original value
            context.fillStyle = originalGlobalFillStyle;
            // restore the original shadow blur
            context.shadowBlur = originalShadowBlur;
          }
        });

        font1.load().then((loadedFont) => {
          // Add loaded font to document
          document.fonts.add(loadedFont);

          context.fillStyle = `rgba(${photoUrl.font1AddressFillStyleR}, ${photoUrl.font1AddressFillStyleG}, ${photoUrl.font1AddressFillStyleB}, 0.85)`; // set the fill color to yellow with 50% opacity
          const originalGlobalFillStyle = context.fillStyle;
          context.font = `${photoUrl.font1AddressFontSize} '${photoUrl.font1}'`;
          const textMetrics = context.measureText(`${details.address}`);

          // Set text to display and capitalize words
          const text = `${details.address}`;
          const capitalizedWords = text.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });

          if (textMetrics.width) {
            context.fillStyle = `rgba(${photoUrl.font1AddressFillStyleR}, ${photoUrl.font1AddressFillStyleG}, ${photoUrl.font1AddressFillStyleB}, ${photoUrl.font1AddressFillStyleA})`; // set the fill color to yellow with 50% opacity

            // Set line height and initialize array for lines of text
            const lineHeight = context.measureText("M").width * 1.35; // adjust line height as desired
            const lines = [];

            // Set the number of words to display per line
            const wordsPerLine = 2;

            // Loop over words in text and split into lines of specified length
            let currentLine = "";
            for (let i = 0; i < capitalizedWords.length; i++) {
              if (i % wordsPerLine === wordsPerLine - 1) {
                // Add the last word to the current line and add it to the lines array
                currentLine += capitalizedWords[i];
                lines.push(currentLine);
                // Start a new line
                currentLine = "";
              } else {
                // Add the word to the current line with a space
                currentLine += capitalizedWords[i] + " ";
              }
            }

            // If there are any words remaining on the last line, add it to the lines array
            if (currentLine !== "") {
              lines.push(currentLine);
            }

            const y = canvasHeight / 1.55;
            for (let i = 0; i < lines.length; i++) {
              context.fillText(
                lines[i],
                canvasWidth / photoUrl.font1AddressCanvasWidth,
                y +
                  i * lineHeight +
                  canvasHeight / photoUrl.font1AddressCanvasHeight,
                textMetrics.width
              );
            }
            // Reset global alpha to its original value
            context.fillStyle = originalGlobalFillStyle;
          }
        });
        font1.load().then((loadedFont) => {
          // Add loaded font to document
          document.fonts.add(loadedFont);

          context.font = `${photoUrl.font1MatchDateFontSize} '${photoUrl.font1}'`;
          const textMetrics = context.measureText(
            `Date of Match: ${details.startMatchDate}`
          );

          const text = `Date of Match: ${details.startMatchDate}`;

          // Set text to display and capitalize words
          const capitalizedWords = text.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });

          if (textMetrics.width) {
            context.fillStyle = `rgba(${photoUrl.font1MatchDateFillStyleR}, ${photoUrl.font1MatchDateFillStyleG}, ${photoUrl.font1MatchDateFillStyleB}, ${photoUrl.font1MatchDateFillStyleA})`; // set the fill color to yellow with 50% opacity

            // Set line height and initialize array for lines of text
            const lineHeight = context.measureText("M").width * 1.35; // adjust line height as desired
            const lines = [];

            // Set the number of words to display per line
            const wordsPerLine = 3;

            // Loop over words in text and split into lines of specified length
            let currentLine = "";
            for (let i = 0; i < capitalizedWords.length; i++) {
              if (i % wordsPerLine === wordsPerLine - 1) {
                // Add the last word to the current line and add it to the lines array
                currentLine += capitalizedWords[i];
                lines.push(currentLine);
                // Start a new line
                currentLine = "";
              } else {
                // Add the word to the current line with a space
                currentLine += capitalizedWords[i] + " ";
              }
            }

            // If there are any words remaining on the last line, add it to the lines array
            if (currentLine !== "") {
              lines.push(currentLine);
            }

            const y = canvasHeight / 1.55;
            for (let i = 0; i < lines.length; i++) {
              context.fillText(
                lines[i],
                canvasWidth / photoUrl.font1MatchDateCanvasWidth,
                y +
                  i * lineHeight +
                  canvasHeight / photoUrl.font1MatchDateCanvasHeight,
                textMetrics.width
              );
            }
          }
        });
        font1.load().then((loadedFont) => {
          // Add loaded font to document
          document.fonts.add(loadedFont);

          context.font = `${photoUrl.font1RegisterFontSize} '${photoUrl.font1}'`;
          const textMetrics = context.measureText(
            "Registor On: tournamaxsports.com"
          );
          const text = "Registor On: tournamaxsports.com";

          const capitalizedWords = text.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });

          if (textMetrics.width) {
            context.fillStyle = `rgba(${photoUrl.font1RegisterFillStyleR}, ${photoUrl.font1RegisterFillStyleG}, ${photoUrl.font1RegisterFillStyleB}, ${photoUrl.font1RegisterFillStyleA})`; // set the fill color to yellow with 50% opacity

            // Set line height and initialize array for lines of text
            const lineHeight = context.measureText("M").width * 1.35; // adjust line height as desired
            const lines = [];

            // Set the number of words to display per line
            const wordsPerLine = 2;

            // Loop over words in text and split into lines of specified length
            let currentLine = "";
            for (let i = 0; i < capitalizedWords.length; i++) {
              if (i % wordsPerLine === wordsPerLine - 1) {
                // Add the last word to the current line and add it to the lines array
                currentLine += capitalizedWords[i];
                lines.push(currentLine);
                // Start a new line
                currentLine = "";
              } else {
                // Add the word to the current line with a space
                currentLine += capitalizedWords[i] + " ";
              }
            }

            // If there are any words remaining on the last line, add it to the lines array
            if (currentLine !== "") {
              lines.push(currentLine);
            }

            const y = canvasHeight / 1.55;
            for (let i = 0; i < lines.length; i++) {
              context.fillText(
                lines[i],
                canvasWidth / photoUrl.font1RegisterCanvasWidth,
                y +
                  i * lineHeight +
                  canvasHeight / photoUrl.font1RegisterCanvasHeight,
                textMetrics.width
              );
            }
          }
        });
        font1.load().then((loadedFont) => {
          // Add loaded font to document
          document.fonts.add(loadedFont);
          context.font = `${photoUrl.font1EntryFeeFontSize} '${photoUrl.font1}'`;

          const textMetrics = context.measureText(
            `entry Fee: ${details.entryFee}`
          );

          // Set text to display and capitalize words
          const text = `entry Fee: ${details.entryFee}`;

          const capitalizedWords = text.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });

          if (textMetrics.width) {
            context.fillStyle = `rgba(${photoUrl.font1EntryFeeFillStyleR}, ${photoUrl.font1EntryFeeFillStyleG}, ${photoUrl.font1EntryFeeFillStyleB}, ${photoUrl.font1EntryFeeFillStyleA})`; // set the fill color to yellow with 50% opacity

            // Set line height and initialize array for lines of text
            const lineHeight = context.measureText("M").width * 1.35; // adjust line height as desired
            const lines = [];

            // Set the number of words to display per line
            const wordsPerLine = 2;

            // Loop over words in text and split into lines of specified length
            let currentLine = "";
            for (let i = 0; i < capitalizedWords.length; i++) {
              if (i % wordsPerLine === wordsPerLine - 1) {
                // Add the last word to the current line and add it to the lines array
                currentLine += capitalizedWords[i];
                lines.push(currentLine);
                // Start a new line
                currentLine = "";
              } else {
                // Add the word to the current line with a space
                currentLine += capitalizedWords[i] + " ";
              }
            }

            // If there are any words remaining on the last line, add it to the lines array
            if (currentLine !== "") {
              lines.push(currentLine);
            }

            // Set y position for text and loop over lines to render them
            const y = canvasHeight / 1.55;
            for (let i = 0; i < lines.length; i++) {
              context.fillText(
                lines[i],
                canvasWidth / photoUrl.font1EntryFeeCanvasWidth,
                y +
                  i * lineHeight +
                  canvasHeight / photoUrl.font1EntryFeeCanvasHeight,
                textMetrics.width
              );
            }
          }
        });

        font1.load().then((loadedFont) => {
          // Add loaded font to document
          document.fonts.add(loadedFont);
          context.font = `${photoUrl.font1PrizeMoneyFontSize} '${photoUrl.font1}'`;

          const textMetrics = context.measureText(
            `Prize Money: ${details.prizeMoney}`
          );

          const text = `Prize Money: ${details.prizeMoney}`;
          const capitalizedWords = text.split(" ").map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          });

          if (textMetrics.width) {
            // Set fill color to plain yellow
            context.fillStyle = `rgba(${photoUrl.font1PrizeMoneyFillStyleR}, ${photoUrl.font1PrizeMoneyFillStyleG}, ${photoUrl.font1PrizeMoneyFillStyleB}, ${photoUrl.font1PrizeMoneyFillStyleA})`; // set the fill color to yellow with 50% opacity

            // Set line height and initialize array for lines of text
            const lineHeight = context.measureText("M").width * 1.35; // adjust line height as desired
            const lines = [];

            // Set the number of words to display per line
            const wordsPerLine = 2;

            // Loop over words in text and split into lines of specified length
            let currentLine = "";
            for (let i = 0; i < capitalizedWords.length; i++) {
              if (i % wordsPerLine === wordsPerLine - 1) {
                // Add the last word to the current line and add it to the lines array
                currentLine += capitalizedWords[i];
                lines.push(currentLine);
                // Start a new line
                currentLine = "";
              } else {
                // Add the word to the current line with a space
                currentLine += capitalizedWords[i] + " ";
              }
            }

            // If there are any words remaining on the last line, add it to the lines array
            if (currentLine !== "") {
              lines.push(currentLine);
            }

            const y = canvasHeight / 1.55;
            for (let i = 0; i < lines.length; i++) {
              context.fillText(
                lines[i],
                canvasWidth / photoUrl.font1PrizeMoneyCanvasWidth,
                y +
                  i * lineHeight +
                  canvasHeight / photoUrl.font1PrizeMoneyCanvasHeight,
                textMetrics.width
              );
            }
          }
        });

        // Store original global alpha value
        const originalGlobalAlpha = context.globalAlpha;

        // Set global alpha to 0.5 to make the image semi-transparent
        context.globalAlpha = photoUrl.locationImageOpacity;

        // Draw the image with reduced opacity
        context.drawImage(
          image1,
          photoUrl.locationImageXaxis,
          photoUrl.locationImageYaxis,
          canvasWidth / photoUrl.locationImageWidth,
          canvasHeight / photoUrl.locationImageHeight
        );

        // Reset global alpha to its original value
        context.globalAlpha = originalGlobalAlpha;
      };
    };
  }, [details, photoUrl]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `${details.tournamentName}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <div class="canvas">
        <canvas
          ref={canvasRef}
          width={photoUrl.width}
          height={photoUrl.height}
          style={{ border: "1px solid #d3d3d3", maxWidth: "100%" }}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <p></p>
        <button
          onClick={handleDownload}
          style={{ display: "block", margin: "0 auto" }}>
          Download
        </button>
      </div>
    </div>
  );
}
export default Poster;

import React, { useState, useEffect } from "react";

function Organaize() {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const optionMenu = document.querySelector(".select-menu"),
      selectBtn = optionMenu.querySelector(".select-btn"),
      options = optionMenu.querySelectorAll(".option"),
      sBtn_text = optionMenu.querySelector(".sBtn-text");

    selectBtn.addEventListener("click", () =>
      optionMenu.classList.toggle("active")
    );

    options.forEach((option) => {
      option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        setSelectedOption(selectedOption);
        optionMenu.classList.remove("active");
      });
    });
  }, []);

  function openNav1() {
    if (selectedOption === "Cricket") {
      //  block of code to be executed if condition1 is true
      console.log("Cricket");
    } else if (selectedOption === "Football") {
      //  block of code to be executed if the condition1 is false and condition2 is true
      console.log("Football");
    } else {
      //  block of code to be executed if the condition1 is false and condition2 is false
      console.log("dc");
    }
  }
  return (
    <div class="select-menu">
      <div class="select-btn">
        <span class="sBtn-text">Select Sports</span>
        <i class="bx bx-chevron-down"></i>
      </div>

      <ul class="options">
        <li class="option">
          {/* <i class="bx bxl-github" style={{ color: "#171515" }}></i> */}
          <span class="option-text">Football</span>
        </li>
        <li class="option">
          {/* <i class="bx bxl-instagram-alt" style={{ color: "#E1306C" }}></i> */}
          <span class="option-text">Cricket</span>
        </li>
        <li class="option">
          {/* <i class="bx bxl-linkedin-square" style={{ color: "#0E76A8" }}></i> */}
          <span class="option-text">Badminton</span>
        </li>
        <li class="option">
          {/* <svg width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="green"
              stroke-width="4"
              fill="yellow"
            />
            Sorry, your browser does not support inline SVG.
          </svg> */}

          <span class="option-text">Hockey</span>
        </li>
      </ul>
      <button onClick={openNav1}>Next</button>
    </div>
  );
}

export default Organaize;

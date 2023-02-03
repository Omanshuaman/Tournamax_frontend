import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HockeySvg from "./svg/Hockey";
import BadmintonSvg from "./svg/Badminton";
import CricketSvg from "./svg/Cricket";
import FootballSvg from "./svg/Football";

function Organaize() {
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();

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

    return () => {
      selectBtn.removeEventListener("click", () =>
        optionMenu.classList.toggle("active")
      );
      options.forEach((option) => {
        option.removeEventListener("click", () => {
          let selectedOption = option.querySelector(".option-text").innerText;
          sBtn_text.innerText = selectedOption;
          setSelectedOption(selectedOption);
          optionMenu.classList.remove("active");
        });
      });
    };
  }, []);

  function openNav1() {
    if (selectedOption === "Cricket") {
      console.log("Cricket");
    } else if (selectedOption === "Football") {
      history.push("/Football");
    } else {
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
          <FootballSvg /> <span class="option-text">Football</span>
        </li>
        <li class="option">
          <CricketSvg /> <span class="option-text">Cricket</span>
        </li>
        <li class="option">
          <BadmintonSvg /> <span class="option-text">Badminton</span>
        </li>
        <li class="option">
          <HockeySvg /> <span class="option-text">Hockey</span>
        </li>
      </ul>
      <a href="#" class="next" onClick={openNav1}>
        Next &raquo;
      </a>
    </div>
  );
}

export default Organaize;

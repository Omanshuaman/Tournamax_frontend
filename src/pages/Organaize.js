import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HockeySvg from "./svg/Hockey";
import BadmintonSvg from "./svg/Badminton";
import CricketSvg from "./svg/Cricket";
import FootballSvg from "./svg/Football";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

function Organaize() {
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();
  const [userId, setUserId] = useState([]);
  const { user, setUser } = ChatState();

  useEffect(() => {
    const optionMenu = document.querySelector(".select-menu"),
      selectBtn = optionMenu.querySelector(".select-btn"),
      options = optionMenu.querySelectorAll(".option"),
      sBtn_text = optionMenu.querySelector(".sBtn-text");

    function handleSelectBtnClick() {
      optionMenu.classList.toggle("active");
    }

    function handleOptionClick(event) {
      const option = event.currentTarget;
      const selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      setSelectedOption(selectedOption);
      optionMenu.classList.remove("active");
    }

    selectBtn.addEventListener("click", handleSelectBtnClick);

    options.forEach((option) => {
      option.addEventListener("click", handleOptionClick);
    });

    return () => {
      selectBtn.removeEventListener("click", handleSelectBtnClick);
      options.forEach((option) => {
        option.removeEventListener("click", handleOptionClick);
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
    <div className="select-menu">
      <div className="select-btn">
        <span className="sBtn-text">Select Sports</span>
        <i className="bx bx-chevron-down"></i>
      </div>

      <ul className="options">
        <li className="option">
          <FootballSvg /> <span className="option-text">Football</span>
        </li>
        {/* <li className="option">
          <CricketSvg /> <span className="option-text">Cricket</span>
        </li>
        <li className="option">
          <BadmintonSvg /> <span className="option-text">Badminton</span>
        </li>
        <li className="option">
          <HockeySvg /> <span className="option-text">Hockey</span>
        </li> */}
      </ul>
      <a href="#" className="next" onClick={openNav1}>
        Next &raquo;
      </a>
    </div>
  );
}
export default Organaize;

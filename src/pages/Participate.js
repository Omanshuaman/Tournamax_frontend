import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import axios from "axios";
import "./Football.css";

import { ChatState } from "../Context/ChatProvider";

function Participate(props) {
  const [Name1, setName1] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [Name2, setName2] = useState(null);
  const [Name3, setName3] = useState(null);
  const [Name4, setName4] = useState(null);

  const [pins, setPins] = useState([]);
  const { user } = ChatState();
  const history = useHistory();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      name1: Name1,
      phoneNumber: PhoneNumber,
      name2: Name2,
      name3: Name3,
      name4: Name4,
      joinedBy: user._id,
      pinId: props.location.state.props,
    };

    try {
      const res = await axiosInstance.post("/join", newPin);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="container">
      <div class="card">
        <form class="card-form" onSubmit={handleSubmit}>
          <div class="input">
            <input
              type="text"
              class="input-field"
              required
              onChange={(e) => setName1(e.target.value)}
            />
            <label class="input-label">Name(Player 1)*</label>
          </div>
          <div class="input">
            <input
              type="text"
              class="input-field"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label class="input-label">Phone Number*</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              min="1"
              max="12"
              onChange={(e) => setName2(e.target.value)}
            />
            <label class="input-label">Name(Player 2)</label>
          </div>

          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              min="1"
              max="11"
              onChange={(e) => setName3(e.target.value)}
            />
            <label class="input-label">Name(Player 3)</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              onChange={(e) => setName4(e.target.value)}
            />
            <label class="input-label">Name(Player 4)</label>
          </div>

          <div class="action">
            <button class="action-button" type="submit">
              Done
            </button>
          </div>
        </form>
        <div class="card-info"></div>
      </div>
    </div>
  );
}

export default Participate;

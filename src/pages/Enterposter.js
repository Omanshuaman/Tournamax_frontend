import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

function Enterposter() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      input: "tournamentName",
      pics: "https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg",
      type: "General",
    };

    try {
      const res = await axios.post("/api/poster", newPin);
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleSubmit}>button</button>;
}

export default Enterposter;

import React, { useState } from "react";
import axios from "axios";

import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";

const ParticipateRecord = (props) => {
  const [pins, setPins] = useState([]);
  const { user } = ChatState();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axiosInstance.get(
          `/api/pins/${props.location.state.props}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setPins(allPins.data);
        console.log(pins);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  });

  return <h1>sdcd</h1>;
};

export default ParticipateRecord;

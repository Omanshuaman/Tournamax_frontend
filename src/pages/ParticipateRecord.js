import React, { useState } from "react";
import axios from "axios";

import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";

const ParticipateRecord = (props) => {
  const [pins, setPins] = useState();
  const { user } = ChatState();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axiosInstance.get(
          `/pins/${props.location.state.props}`,
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
  }, []);

  return (
    <>
      {pins &&
        pins.length > 0 &&
        pins.map((p, index) => (
          <div class="card" key={index}>
            <div class="container">
              <h1>Name1:{p.name1}</h1>
              <h1>Phone Number:{p.phoneNumber}</h1>
              <h1>Name2:{p.name2}</h1>
              <h1>Name3:{p.name3}</h1>
              <h1>Name4:{p.name4}</h1>
              <h1>Name5:{p.name5}</h1>
              <h1p>Name6:{p.name6}</h1p>
              <h1>Name7:{p.name7}</h1>
              <h1>Name8:{p.name8}</h1>
              <h1>Name9:{p.name9}</h1>
              <h1>Name10:{p.name10}</h1>
              <h1>Name11:{p.name11}</h1>
            </div>
          </div>
        ))}
    </>
  );
};

export default ParticipateRecord;

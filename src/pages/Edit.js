import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";

const Edit = (props) => {
  const [Name1, setName1] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [Name2, setName2] = useState(null);
  const [Name3, setName3] = useState(null);
  const [Name4, setName4] = useState(null);
  const [value, setValue] = useState("");
  const [pins, setPins] = useState([]);
  const { user } = ChatState();
  const history = useHistory();
  const [tournamentName, setTournamentName] = useState(null);
  const [organizerName, setOrganizerName] = useState(null);
  const [noOfTeam, setNoOfTeam] = useState(null);
  const [entryFee, setEntryFee] = useState(null);
  const [prizeMoney, setPrizeMoney] = useState(null);
  const [longitude, setLongitude] = useState("78.656891");
  const [latitude, setLatitude] = useState("22.973423");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const mapRef = React.useRef();
  const [address, setAddress] = useState(null);
  const [time, setTime] = useState("");
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange1 = (event) => {
    setOrganizerName(event.target.value);
  };
  const handleChange2 = (event) => {
    setNoOfTeam(event.target.value);
  };
  const handleChange3 = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (pins && pins.length) {
      console.log(pins);
      setValue(pins[0].tournamentName);
      setOrganizerName(pins[0].organizerName);
      setNoOfTeam(pins[0].noOfTeam);
      setAddress(pins[0].address);
    }
  }, [pins]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axiosInstance.get(
          `/api/edittournament/${props.location.state.props}`
        );
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [props]);

  const handleRenameTournament = async () => {
    try {
      const { data } = await axiosInstance.put(`/api/edit/renametournament`, {
        chatId: props.location.state.props,
        chatName: value,
        nameUser: organizerName,
        noOfTeam: noOfTeam,
        address: address,
      });

      console.log(data._id);
      history.push("/mytournament");
    } catch (error) {
      console.log(error);
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
              value={value}
              onChange={handleChange}
            />
            <label class="input-label">Tournament Name</label>
          </div>
          <div class="input">
            <input
              type="text"
              class="input-field"
              value={organizerName}
              onChange={handleChange1}
            />
            <label class="input-label">Organizer Name(Your Name)</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              min="1"
              max="12"
              value={noOfTeam}
              onChange={handleChange2}
            />
            <label class="input-label">No. of Players in a team</label>
          </div>

          <div class="input">
            <input
              type="text"
              class="input-field"
              required
              value={address}
              onChange={handleChange3}
            />
            <label class="input-label">Address</label>
          </div>

          <div class="action">
            <button
              class="action-button"
              type="submit"
              onClick={handleRenameTournament}
            >
              Done
            </button>
          </div>
        </form>

        <div class="card-info"></div>
      </div>
    </div>
  );
};

export default Edit;

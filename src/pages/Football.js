import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Football.css";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import { ChatState } from "../Context/ChatProvider";
import { Room } from "@material-ui/icons";
import { DateRangePicker } from "react-date-range";
import { useHistory } from "react-router-dom";

/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function FootballOrganize() {
  const [tournamentName, setTournamentName] = useState(null);
  const [organizerName, setOrganizerName] = useState(null);
  const [noOfTeam, setNoOfTeam] = useState(null);
  const [entryFee, setEntryFee] = useState(null);
  const [prizeMoney, setPrizeMoney] = useState(null);
  const [rules, setRules] = useState(null);
  const [pins, setPins] = useState([]);
  const [longitude, setLongitude] = useState("78.656891");
  const [latitude, setLatitude] = useState("22.973423");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const mapRef = React.useRef();
  const { user } = ChatState();
  const [address, setAddress] = useState(null);
  const [time, setTime] = useState("");
  const history = useHistory();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const [viewport, setViewport] = useState({
    latitude: 22.973423,
    longitude: 78.656891,
    zoom: 2,
  });

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  useEffect(() => {
    axiosInstance
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX}`
      )
      .then((response) => {
        setAddress(response.data.features[0].place_name);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      tournamentName: tournamentName,
      organizerName: organizerName,
      noOfTeam: noOfTeam,
      long: longitude,
      lat: latitude,
      address: address,
      startMatchDate: startDate,
      endMatchDate: endDate,
      time: time,
      entryFee: entryFee,
      prizeMoney: prizeMoney,
      createdBy: user._id,
      sports: "Football",
      groupLink: "fdv",
      joinedBy: user._id,
      rules: rules,
    };

    try {
      const res = await axiosInstance.post("/pins", newPin);
      setPins([...pins, res.data]);
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
              onChange={(e) => setTournamentName(e.target.value)}
            />
            <label class="input-label">Tournament Name</label>
          </div>
          {/* <div class="select-menuu">
            <div class="select-btnu">
              <span class="sBtn-textu">eg-</span>
              <i class="bx bx-chevron-down"></i>
            </div>
            <ul class="optionsu">
              <li class="optionu">
                <span class="option-textu">Football</span>
              </li>
              <li class="optionu">
                <span class="option-textu">Cricket</span>
              </li>
              <li class="optionu">
                <span class="option-textu">Badminton</span>
              </li>
              <li class="optionu">
                <span class="option-textu">Hockey</span>
              </li>
            </ul>
          </div> */}
          <div class="input" style={{ marginTop: "40px" }}>
            <input
              type="text"
              class="input-field"
              required
              onChange={(e) => setOrganizerName(e.target.value)}
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
              onChange={(e) => setNoOfTeam(e.target.value)}
            />
            <label class="input-label">No. of Players in a team</label>
          </div>
          <div class="input">
            <ReactMapGL
              ref={mapRef}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX}
              style={{
                width: "100%",
                height: "50vh",
              }}
              {...viewport}
              onMove={(evt) => setViewport(evt.viewport)}
              mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            >
              <Marker
                latitude={latitude}
                longitude={longitude}
                draggable
                onDragEnd={(evt) => {
                  setLatitude(evt.lngLat.lat);
                  setLongitude(evt.lngLat.lng);
                  setViewport({
                    ...viewport,
                    latitude: evt.lngLat.lat,
                    longitude: evt.lngLat.lng,
                  });
                }}
              >
                <Room
                  style={{
                    fontSize: 30,
                    color: "slateblue",
                    cursor: "pointer",
                  }}
                />
              </Marker>
            </ReactMapGL>
            <p>
              <midium>{latitude + ", "}</midium>
              <midium>{longitude}</midium>
            </p>
          </div>
          <div class="input">
            <input type="text" class="input-field" required value={address} />
            <label class="input-label">Address</label>
          </div>
          <div class="input">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              onChange={handleSelect}
            />
          </div>
          <div class="input">
            <input
              type="time"
              id="appt"
              name="appt"
              onChange={handleTimeChange}
            />
            <label for="appt">Select a time:</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              min="1"
              max="11"
              onChange={(e) => setEntryFee(e.target.value)}
            />
            <label class="input-label">Entry fee</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              onChange={(e) => setPrizeMoney(e.target.value)}
            />
            <label class="input-label">Prize Money</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              onChange={(e) => setRules(e.target.value)}
            />
            <label class="input-label">Rules</label>
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
export default FootballOrganize;

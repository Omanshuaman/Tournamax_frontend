import React, { useState } from "react";
import axios from "axios";

import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// import required modules

// import component 👇
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
const MyTournament = () => {
  const [organizied, setOrganized] = useState();
  const [participated, setParticipated] = useState();
  const [display, setDisplay] = useState(false);

  const myStorage = window.localStorage;
  const mapRef = React.useRef();
  const ref = useRef(null);
  const { user, setUser } = ChatState();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();
  const btnRef = React.useRef();
  const handleClose = () => setShow(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tournamentname, setTournamentName] = useState(null);
  const [title, setTitle] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [organizerName, setOrganizerName] = useState(null);
  const [noofTeam, setNoofTeam] = useState(null);
  const [address, setAddress] = useState(null);
  const [startMatchDate, setStartMatchDate] = useState([]);
  const [endMatchDate, setEndMatchDate] = useState(null);
  const [time, setTime] = useState(null);
  const [entryFee, setEntryFee] = useState([]);
  const [prizeMoney, setPrizeMoney] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [sports, setSports] = useState(null);

  const [currentCardId, setCurrentCard] = useState(null);
  const [currentCardDesc, setCurrentCardDesc] = useState(null);
  const [currentCardUsername, setCurrentCardUsername] = useState(null);
  const [picture, setPicture] = useState();
  const [markers, setMarkers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [currentSlideId, setCurrentSlideId] = useState([]);

  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const history = useHistory();

  function JoinGroup() {
    window.open(prizeMoney, "_blank");
  }
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosInstance.get("/pins/organize", config);

      setOrganized(data);
    } catch (error) {}
  };

  const fetchJoined = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosInstance.get("/pins/participate", config);
      setParticipated(data);
    } catch (error) {}
  };

  const participant = async (id) => {
    history.push({
      pathname: "/participaterecord",
      state: { props: id },
    });
  };

  const edit = (id) => {
    history.push({
      pathname: "/edit",
      state: { props: id },
    });
  };
  useEffect(() => {
    fetchChats();
  });

  const handleClick = () => {
    setDisplay(!display);
  };
  const openNav3 = (
    tournamentName,
    id,
    organizerName,
    noOfTeam,
    address,
    startMatchDate,
    endMatchDate,
    time,
    entryFee,
    prizeMoney,

    sports,
    pics
  ) => {
    setCurrentSlideId(id);
    setTournamentName(tournamentName);
    setOrganizerName(organizerName);
    setNoofTeam(noOfTeam);
    setAddress(address);
    setStartMatchDate(startMatchDate);
    setEndMatchDate(endMatchDate);
    setTime(time);
    setEntryFee(entryFee);
    setPrizeMoney(prizeMoney);
    setSports(sports);
    setPicture(pics);

    setShow(true);
  };
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setSelectedTab(tabIndex);
    if (tabIndex === 1) {
      fetchJoined();
    }
  };
  return (
    <>
      <div>
        <div className="tab">
          <button
            className={selectedTab === 0 ? "active" : ""}
            onClick={() => handleTabClick(0)}>
            Organized
          </button>
          <button
            className={selectedTab === 1 ? "active" : ""}
            onClick={() => handleTabClick(1)}>
            Participated
          </button>
        </div>
        <div className="tab-content">
          {selectedTab === 0 &&
            organizied &&
            organizied.length > 0 &&
            organizied.map((p, index) => (
              <div className="card" key={index} onClick={handleClick}>
                <div className="container">
                  <h4>
                    <b>{p.tournamentName}</b>
                  </h4>
                  <p>{p.sports}</p>
                </div>
                {display && (
                  <div className="myDIV">
                    <button onClick={() => participant(p._id)}>
                      Participant
                    </button>
                    <button onClick={() => edit(p._id)}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          {selectedTab === 1 &&
            participated &&
            participated.length > 0 &&
            participated.map((p, index) => (
              <div
                className="card"
                key={index}
                onClick={() =>
                  openNav3(
                    p.tournamentName,
                    p._id,
                    p.organizerName,
                    p.noOfTeam,
                    p.address,
                    p.startMatchDate,
                    p.endMatchDate,
                    p.time,
                    p.entryFee,
                    p.prizeMoney,
                    p.createdBy,
                    p.sports
                  )
                }>
                <div className="container">
                  <h4>
                    <b>{p.tournamentName}</b>
                  </h4>
                  <p>{p.sports}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{tournamentname}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <h1>{currentCardDesc}</h1>
            </div>
            {picture !== "" && (
              <>
                <img align="left" src={picture} width="250" height="250" />
              </>
            )}
            <div>
              <h1>Organizer</h1>
              <h1>{organizerName}</h1>
            </div>
            <div>
              <h1>No. of Team</h1>
              <h1>{noofTeam}</h1>
            </div>
            <div>
              <h1>Address</h1>
              <h1>{address}</h1>
            </div>
            <div>
              <h1>Date(from)</h1>
              {endMatchDate ? (
                <h1>{startMatchDate.slice(0, 10)}</h1>
              ) : (
                <h1>N/A</h1>
              )}
            </div>
            <div>
              <h1>Date(to)</h1>
              {endMatchDate ? (
                <h1>{endMatchDate.slice(0, 10)}</h1>
              ) : (
                <h1>N/A</h1>
              )}
            </div>
            <div>
              <h1>Time</h1>
              <h1>{time}</h1>
            </div>
            <div>
              <h1>Entry Fee</h1>
              <h1>{entryFee}</h1>
            </div>
            <div>
              <h1>Prize Money</h1>
              <h1>{prizeMoney}</h1>
            </div>
            {prizeMoney && (
              <div>
                <h1>Group Link</h1>
                <div className="edit-button">
                  <h1>{prizeMoney}</h1>
                  <button width={"10%"} onClick={JoinGroup}>
                    Join
                  </button>
                </div>
              </div>
            )}
            <button
              width={"100%"}
              colorScheme="blue"
              style={{ marginTop: "1rem" }}
              onClick={() =>
                history.push({
                  pathname: "/participate",
                  state: { props: currentSlideId },
                })
              }>
              Register
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default MyTournament;

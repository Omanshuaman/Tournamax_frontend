import "swiper/swiper.min.css";
import Homepage from "./HomePage";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as React from "react";
import Cookies from "universal-cookie";
import ReactGA from "react-ga";

import "leaflet/dist/leaflet.css";

// import component 👇
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import jwt_decode from "jwt-decode";
import osm from "./osm-providers";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Modal1 from "react-bootstrap/Modal";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
function Map() {
  const myStorage = window.localStorage;
  const mapRef = React.useRef();
  const ref = useRef(null);
  const { user, setUser } = ChatState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState([]);
  const [showMapClickListener, setShowMapClickListener] = useState(false);
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentCardId, setCurrentCard] = useState(null);
  const [currentCardDesc, setCurrentCardDesc] = useState(null);
  const [currentCardUsername, setCurrentCardUsername] = useState(null);
  const [picture, setPicture] = useState();
  const cookies = new Cookies();
  const [markers, setMarkers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [currentSlideId, setCurrentSlideId] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [center, setCenter] = useState([51.505, -0.09]); // default center
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hasClickedMarker, setHasClickedMarker] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleClose3 = () => setShow3(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose = () => setShow(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const history = useHistory();

  useEffect(() => {
    console.log(longitude);
    console.log(latitude);
    const zoom = mapRef.current ? mapRef.current.getZoom() : ZOOM_LEVEL;
    mapRef.current?.flyTo([latitude, longitude], zoom, {
      duration: 0.4,
    });
  }, [longitude, latitude, mapRef]);
  function handleMarkerClick(id, latlng, child) {
    setCurrentPlaceId(id);
    console.log(child);
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slideTo(child);
    }
  }
  const ZOOM_LEVEL = 9;

  const logoutHandler = () => {
    setUser(null);
    myStorage.removeItem("userInfo");
    cookies.remove("token");
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
    createdBy,
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
  const openNav2 = () => {
    setShow3(true);
  };
  const OrganizeTournament = () => {
    history.push("/mytournament");
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axiosInstance.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
    ReactGA.initialize("UA-227757407-1");
    ReactGA.pageview("https://tournamaxsports.com/");
  }, []);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     const map = mapRef.current.leafletElement;
  //     map.whenReady(() => {
  //       map.flyTo([latitude, longitude], 4);
  //     });
  //   }
  // }, [longitude, latitude]);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(center);

  useEffect(() => {
    const keys = Object.keys(pins).slice(0, 15);
    const arr = keys.map((key) => pins[key]);
    console.log(arr);
    setMarkers(arr);
  }, [pins]);
  function JoinGroup() {
    window.open(prizeMoney, "_blank");
  }
  const submitHandler = async () => {
    try {
      const cookieValue = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (!cookieValue) return;
      const decoded = jwt_decode(cookieValue.split("=")[1]);
      const res = await axios.get(`/api/user/${decoded.id}`);
      localStorage.setItem("userInfo", JSON.stringify(res.data[0]));
      setUser(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    submitHandler();
  }, []);
  return (
    <>
      <div style={{ zIndex: 999, position: "absolute", right: 0 }}>
        {user ? (
          <div>
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={user.pic} alt={user.name} />
            </button>
            {isOpen && (
              <div>
                <button onClick={() => OrganizeTournament()}>
                  My Tournament
                </button>

                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              class="log"
              onClick={() => {
                setShow4(true);
              }}>
              Login
            </button>
          </div>
        )}
      </div>
      <div style={{ zIndex: 999, position: "absolute", left: 0 }}>
        <div>
          <button class="log" onClick={() => openNav2()}>
            Login
          </button>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          ref={mapRef}
          zoomControl={false}
          whenCreated={setMap}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.lat, marker.long]}
              eventHandlers={{
                click: () =>
                  handleMarkerClick(
                    marker._id,
                    [marker.lat, marker.long],
                    index
                  ),
              }}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <div
          style={{
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}>
          <>
            <Swiper
              ref={ref}
              slidesPerView={1.2}
              spaceBetween={20}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  width: 640,
                  slidesPerView: 1.3,
                  spaceBetween: 35,
                },
              }}
              centeredSlides={true}
              className="mySwiper bottom-element">
              {markers.map((p, index) => (
                <SwiperSlide
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
                      p.sports,
                      p.pic
                    )
                  }>
                  {({ isActive }) => (
                    <>
                      <img align="left" src={p.pic} />
                      <div class="grid_swiper">
                        <div class="tournamentname">{p.tournamentName}</div>
                        <div class="sportsname">{p.sports}</div>
                        <div class="vlcard2">Entry fee:{p.entryFee}</div>
                        {isActive ? (
                          <>
                            {setLongitude(p.long)}
                            {setLatitude(p.lat)}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  )}
                </SwiperSlide>
              ))}
              <>
                {user ? (
                  <>
                    <div class="organize">
                      <button
                        class="organize_button"
                        //     onClick={openNav}
                        onClick={() => history.push("/organize")}>
                        ORGANIZE YOUR TOURNAMENT
                      </button>
                    </div>
                  </>
                ) : (
                  <div class="organize">
                    <button
                      class="organize_button"
                      //     onClick={openNav}
                      onClick={() => {
                        setShow4(true);
                      }}>
                      ORGANIZE YOUR TOURNAMENT
                    </button>
                  </div>
                )}
                <>
                  <Modal show={show4} onHide={handleClose4}>
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                      <Homepage setonClick={handleClose4} />
                    </Modal.Body>
                  </Modal>
                </>
              </>
            </Swiper>
          </>
          <div
            style={{
              zIndex: 1000,
            }}>
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
                      <img
                        align="left"
                        src={picture}
                        width="250"
                        height="250"
                      />
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
          </div>
          <div
            style={{
              zIndex: 1000,
            }}>
            <Offcanvas show={show3} onHide={handleClose3} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>tournamentname</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <button onClick={handleShow2}>Sign in</button>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          <>
            <Modal1 show={show2} onHide={handleClose2}>
              <Modal1.Header closeButton></Modal1.Header>
              <Homepage setonClick={handleClose2} />
            </Modal1>
          </>
        </div>
      </div>
    </>
  );
}
export default Map;

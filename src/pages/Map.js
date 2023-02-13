import "mapbox-gl/dist/mapbox-gl.css";
import "swiper/swiper.min.css";
import Homepage from "./HomePage";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState, useRef } from "react";
import { Room, Star } from "@material-ui/icons";
import ProfileModal from "../components/miscellaneous/ProfileModal";
import axios from "axios";
import Header from "../components/Header";
import * as React from "react";
import Cookies from "universal-cookie";
import ReactGA from "react-ga";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { Pagination } from "swiper";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  Image,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
// import required modules
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  Stack,
  Box,
  Textarea,
  InputLeftAddon,
  firstField,
  InputRightAddon,
  List,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import jwt_decode from "jwt-decode";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function Map() {
  const myStorage = window.localStorage;
  const mapRef = React.useRef();
  const ref = useRef(null);
  const { user, setUser } = ChatState();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState([]);
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
  const cookies = new Cookies();
  const [markers, setMarkers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [currentSlideId, setCurrentSlideId] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const toast = useToast();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const history = useHistory();
  const handleClick = () => {
    setShow(!show);
  };
  const [viewport, setViewport] = useState({
    latitude: 27.173891,
    longitude: 78.042068,
    zoom: 4,
  });

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isLeftDrawerOpen,
    onOpen: onLeftDrawerOpen,
    onClose: onLeftDrawerClose,
  } = useDisclosure();
  const btnRef = React.useRef();
  const handleMarkerClick = (id, lat, long, child) => {
    setCurrentPlaceId(id);

    console.log(child);
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slideTo(child);
    }

    mapRef.current?.flyTo({
      center: [long, lat],
      duration: 500,
    });
  };

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
    onDrawerOpen();
    console.log(pics + "gg");
  };
  const myTournament = () => {
    onLeftDrawerOpen();
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

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 500,
    });
  }, [longitude, latitude]);

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
    <div class="whole">
      <div class="header">
        {user ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => OrganizeTournament()}>
                My Tournament
              </MenuItem>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <div>
            <button class="log" onClick={onLoginOpen}>
              Login
            </button>
          </div>
        )}
      </div>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
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
            className="mySwiper bottom-element"
          >
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
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      align="left"
                      src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
                    />
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
                      onClick={() => history.push("/organize")}
                    >
                      ORGANIZE YOUR TOURNAMENT
                    </button>
                  </div>
                </>
              ) : (
                <div class="organize">
                  <button
                    class="organize_button"
                    //     onClick={openNav}
                    onClick={onLoginOpen}
                  >
                    ORGANIZE YOUR TOURNAMENT
                  </button>
                </div>
              )}
              <>
                <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                      <Homepage setonClick={onLoginClose} />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </>
            </>
          </Swiper>
        </>
        {markers.map((p, index) => (
          <>
            <Marker
              key={index}
              id="marker"
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room
                style={{
                  fontSize: 20,
                  color: "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long, index)}
              />
            </Marker>
          </>
        ))}
        <>
          <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerClose}
            finalFocusRef={btnRef}
            size="sm"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{currentSlide}</DrawerHeader>
              <DrawerBody>
                <Stack spacing="26px">
                  <Box>
                    <FormLabel>{tournamentname}</FormLabel>
                    <h1>{currentCardDesc}</h1>
                  </Box>

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

                  <Box>
                    <FormLabel>Organizer</FormLabel>
                    <h1>{organizerName}</h1>
                  </Box>
                  <Box>
                    <FormLabel>No. of Team</FormLabel>
                    <h1>{noofTeam}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Address</FormLabel>
                    <h1>{address}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Date(from)</FormLabel>
                    <h1>{startMatchDate}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Date(to)</FormLabel>
                    <h1>{endMatchDate}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Time</FormLabel>
                    <h1>{time}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Entry Fee</FormLabel>
                    <h1>{entryFee}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Prize Money</FormLabel>
                    <h1>{prizeMoney}</h1>
                  </Box>
                  <Box>
                    <FormLabel>Group Link</FormLabel>
                    <div class="edit-button">
                      <h1>{prizeMoney}</h1>
                      <Button width={"10%"} onClick={JoinGroup}>
                        Join
                      </Button>
                      {/* <Button width={"10%"} onClick={onEditOpen}>
                        Join
                      </Button> */}
                    </div>
                  </Box>
                  <Button
                    width={"100%"}
                    colorScheme="blue"
                    style={{ marginTop: "1rem" }}
                    onClick={() =>
                      history.push({
                        pathname: "/participate",
                        state: { props: currentSlideId },
                      })
                    }
                  >
                    Register
                  </Button>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      </ReactMapGL>
    </div>
  );
}
export default Map;

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
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Pagination } from "swiper";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
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
  Button,
  useDisclosure,
  ModalHeader,
  Input,
  ModalFooter,
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

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

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
  const [selectedOption, setSelectedOption] = useState(null);
  const [tournamentname, setTournamentName] = useState(null);
  const [title, setTitle] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [currentCardId, setCurrentCard] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const { poster, setPoster } = ChatState();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const history = useHistory();

  const [viewport, setViewport] = useState({
    latitude: 27.173891,
    longitude: 78.042068,
    zoom: 4,
  });

  const params = {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      realIndexChange: (swiper) => console.log(swiper.realIndex),
    },
  };
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onClose: onPhotoClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const btnRef = React.useRef();
  const handleMarkerClick = (id, lat, long, child) => {
    setCurrentPlaceId(id);
    // setViewport({
    //   ...viewport,
    //   latitude: lat,
    //   longitude: long,
    // });
    // console.log(Object.values(pins)[0].long);
    console.log(child);
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slideTo(child);
    }

    mapRef.current?.flyTo({
      center: [long, lat],
      duration: 500,
    });
  };

  const handleCardClick = (id) => {
    setCurrentCard(id);
  };

  const PosterSubmit = () => {
    history.push("/poster");
  };

  const handleAddClick = (e) => {
    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
    console.log(viewport.latitude);
    console.log(e.lngLat.lat);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: tournamentname,
      title: title,
      desc: "hey stupid",
      rating: 1,
      lat: 4.65178,
      long: 101.08413,
    };

    try {
      const res = await axiosInstance.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = () => {
    setUser(null);
    myStorage.removeItem("userInfo");
  };
  function openNav() {
    document.getElementById("mySidenav").style.width = "450px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function openNav1() {
    if (selectedOption === "Cricket") {
      //  block of code to be executed if condition1 is true
      document.getElementById("mySidenav1").style.width = "450px";
    } else if (selectedOption === "Football") {
      //  block of code to be executed if the condition1 is false and condition2 is true
      document.getElementById("mySidenav2").style.width = "450px";
    } else {
      //  block of code to be executed if the condition1 is false and condition2 is false
    }
  }

  function closeNav1() {
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
  }

  const openNav3 = (id) => {
    setCurrentPlaceId(id);

    document.getElementById("mySidenav3").style.width = "450px";
    console.log("dv");
  };

  function closeNav3() {
    document.getElementById("mySidenav3").style.width = "0";
  }
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

  return (
    <div className="">
      <Header></Header>

      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{
          width: "100%",
          height: "100vh",
        }}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
        <>
          <Alert status="warning">
            <AlertIcon />
            <p>
              Website currently in development stage. Wait till mid january to
              get stable.
            </p>
          </Alert>
        </>
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
              <>
                {" "}
                <SwiperSlide
                  key={index}
                  // onClick={() => openNav3(p._id)}
                  onClick={onDrawerOpen}
                >
                  {({ isActive }) => (
                    <>
                      <img
                        align="left"
                        src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
                      ></img>
                      <div class="grid grid-cols-12 gap-3 min-h-full">
                        <div class="col-start-1 col-end-6 ml-3 sm:ml-7">
                          <div class=" mt-6 ">Football</div>
                          <div class="mt-4">Date:22/11/2022</div>
                        </div>
                        <div class="vl col-start-6 col-end-7 mt-7 "></div>
                        <div class="col-end-13 col-span-6">
                          <div class="mt-10">Entry fee:Free</div>
                        </div>
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
              </>
            ))}

            <>
              {user ? (
                <>
                  <div id="mySidenav" class="sidenav">
                    <a class="closebtn" onClick={closeNav}>
                      &times;
                    </a>
                    <Select
                      placeholder="Select option"
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Hockey">Hockey</option>
                    </Select>

                    <button onClick={openNav1}>Show Value</button>
                  </div>

                  <div id="mySidenav1" class="sidenav">
                    <a class="closebtn" onClick={closeNav1}>
                      &times;
                    </a>
                    <form action="#" class="mb-6" onSubmit={handleSubmit}>
                      <div class="mb-6">
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tournmanet name:
                        </label>
                        <input
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => setTournamentName(e.target.value)}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          for="subject"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                      >
                        Send message
                      </button>
                    </form>{" "}
                  </div>

                  <div id="mySidenav2" class="sidenav">
                    <a class="closebtn" onClick={closeNav1}>
                      &times;
                    </a>

                    <button>Football</button>
                  </div>
                  <div class="flex justify-center">
                    <button
                      className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl w-3/4"
                      //     onClick={openNav}
                      onClick={() => history.push("/organize")}
                    >
                      ORGANIZE YOUR TOURNAMENT
                    </button>
                  </div>
                </>
              ) : (
                <div class="flex justify-center">
                  <button
                    className="text-purple-500 bg-white px-10 py-4 shadow-lg rounded-full font-bold my-3 hover:shadow-xl w-3/4"
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

            {p._id === currentPlaceId && (
              <div id="mySidenav3" class="sidenav3">
                <a
                  href="javascript:void(0)"
                  class="closebtn"
                  onClick={closeNav3}
                >
                  &times;
                </a>

                <img
                  src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
                  class="w-fit rounded-lg"
                  onClick={onPhotoOpen}
                ></img>

                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">{p._id}</a>
              </div>
            )}
          </>
        ))}

        <>
          <Modal isOpen={isPhotoOpen} onClose={onPhotoClose}>
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <img src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"></img>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>

        <>
          <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
            </DrawerContent>
          </Drawer>
        </>
      </ReactMapGL>
    </div>
  );
}
export default Map;

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
import Cookies from "js-cookie";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
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
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();

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

  const [markers, setMarkers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [currentSlideId, setCurrentSlideId] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [pic, setPic] = useState();
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
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
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
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image.",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "eleven-cloud");
      fetch("https://api.cloudinary.com/v1_1/eleven-cloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image.",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
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

    sports
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
    onDrawerOpen();
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
    function getCookie(name) {
      var value = "; " + document.cookie;
      console.log(value);
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    let cookieValue = getCookie("lama");
    console.log(document.cookie);
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

  const handleRename = async () => {
    try {
      const { data } = await axiosInstance.put(`/edit/rename`, {
        chatId: currentSlideId,
        chatName: pic,
      });

      console.log(data._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleRenameGroupLink = async () => {
    try {
      const { data } = await axiosInstance.put(`/edit/renamegroup`, {
        chatId: currentSlideId,
        chatName: currentSlideId,
      });

      console.log(data._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
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
                    p.sports
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      align="left"
                      src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
                    />
                    <div className="grid grid-cols-12 gap-3 min-h-full">
                      <div className="col-start-1 col-end-6 ml-3 sm:ml-7">
                        <div className="mt-6">{p.tournamentName}</div>
                        <div className="mt-4">{p.sports}</div>
                      </div>
                      <div className="vl col-start-6 col-end-7 mt-7" />
                      <div className="col-end-13 col-span-6">
                        <div className="mt-10">Entry fee:{p.entryFee}</div>
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
            ))}

            <>
              {user ? (
                <>
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
                {/* <FormControl id="pic">
                  <FormLabel>Upload your picture</FormLabel>
                  <Input
                    type={"file"}
                    p={"1.5"}
                    bg={"gray.50"}
                    accept="image/*"
                    onChange={(e) => {
                      postDetails(e.target.files[0]);
                    }}
                  />
                </FormControl>
                <Button
                  width={"100%"}
                  colorScheme="blue"
                  style={{ marginTop: "1rem" }}
                  isLoading={loading}
                  onClick={handleRename}
                >
                  Sign Up
                </Button>
                <Button
                  width={"100%"}
                  colorScheme="blue"
                  style={{ marginTop: "1rem" }}
                  onClick={() => history.push("/image")}
                >
                  Photo Template
                </Button> */}
                <Stack spacing="26px">
                  <Box>
                    <FormLabel>{tournamentname}</FormLabel>
                    <h1>{currentCardDesc}</h1>
                  </Box>
                  <img
                    align="left"
                    src="https://marketplace.canva.com/EADao61dcMM/1/0/1131w/canva-black-simple-sports-event-poster-GoiXbRR4fcs.jpg"
                    width="200"
                    height="200"
                  />
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
                    {user ? (
                      <div class="edit-button">
                        <h1>{prizeMoney}</h1>
                        <Button width={"10%"} onClick={onEditOpen}>
                          Edit
                        </Button>
                      </div>
                    ) : (
                      <h1>..........</h1>
                    )}
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
      <div class="my-tournament">
        <button onClick={() => myTournament()}>More</button>
      </div>
      <>
        <Drawer
          isOpen={isLeftDrawerOpen}
          placement="left"
          onClose={onLeftDrawerClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              <button onClick={() => OrganizeTournament()}>
                My Tournament
              </button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
      <>
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              Update Group Link
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
              <FormControl d="flex">
                <Select placeholder="Select option">
                  <option value="option1">Discord</option>
                  <option value="option2">Telegram</option>
                </Select>
                <Input placeholder="Link" mb={3} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleRenameGroupLink}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
export default Map;

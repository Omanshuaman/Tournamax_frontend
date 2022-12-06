// import "mapbox-gl/dist/mapbox-gl.css";
import Homepage from "./HomePage";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import ProfileModal from "../components/miscellaneous/ProfileModal";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../components/Header";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useToast,
  ModalCloseButton,
  Button,
  useDisclosure,
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

function Map() {
  const myStorage = window.localStorage;

  const { user, setUser } = ChatState();

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [currentCardId, setCurrentCard] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const { poster, setPoster } = ChatState();
  const toast = useToast();

  const history = useHistory();

  const [viewport, setViewport] = useState({
    latitude: 27.173891,
    longitude: 78.042068,
    zoom: 4,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
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
    console.log(e.lngLat.lat);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: user.name,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("api/pins", newPin);
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
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/api/poster");
        setPoster(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div className="App">
      <Header />

      <button
        className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150 m-560"
        onClick={PosterSubmit}
      >
        Im flexible
      </button>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{
          width: "100%",
          height: "100vh",
        }}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        transitionDuration="200"
        onDblClick={handleAddClick}
      >
        <>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {poster.map((p) => (
              <>
                <SwiperSlide key={p._id} onClick={() => handleCardClick(p._id)}>
                  {({ isActive }) => (
                    <div>{isActive ? console.log(p.input) : "not active"}</div>
                  )}
                  {/* <h1>{p.input}</h1> */}
                </SwiperSlide>

                {p._id === currentCardId &&
                  toast({
                    title: p.input,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "bottom",
                  })}
              </>
            ))}
          </Swiper>
        </>

        {pins.map((p) => (
          <>
            console.log(p.long); console.log(user._id);
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room
                style={{
                  fontSize: 30,
                  color: "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
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
          <div className="buttons">
            <button className="button login" onClick={onOpen}>
              Log in
            </button>
            <button className="button register" onClick={onOpen}>
              Register
            </button>
          </div>
        )}
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Homepage setonClick={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      </ReactMapGL>
    </div>
  );
}
export default Map;

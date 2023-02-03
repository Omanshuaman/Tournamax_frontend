import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  FormLabel,
  Button,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
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
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
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
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box borderRadius="lg" width={"100%"} p={10}>
          <Tabs variant="soft-rounded" colorScheme="green" defaultIndex={0}>
            <TabList mb={"1rem"}>
              <Tab w={"50%"}>Organized</Tab>
              <Tab w={"50%"} onClick={fetchJoined}>
                Participated
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {organizied &&
                  organizied.length > 0 &&
                  organizied.map((p, index) => (
                    <div class="card" key={index} onClick={handleClick}>
                      <div class="container">
                        <h4>
                          <b>{p.tournamentName}</b>
                        </h4>
                        <p>{p.sports}</p>
                      </div>
                      {display && (
                        <div class="myDIV">
                          <button onClick={() => participant(p._id)}>
                            Participant
                          </button>
                          <button onClick={() => edit(p._id)}>Edit</button>
                        </div>
                      )}
                    </div>
                  ))}
              </TabPanel>
              <TabPanel>
                {participated &&
                  participated.length > 0 &&
                  participated.map((p, index) => (
                    <div
                      class="card"
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
                      <div class="container">
                        <h4>
                          <b>{p.tournamentName}</b>
                        </h4>
                        <p>{p.sports}</p>
                      </div>
                    </div>
                  ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>

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
    </>
  );
};

export default MyTournament;

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  ModalFooter,
  Input,
  Select,
  FormControl,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  useDisclosure,
  loading,
  HStack,
  FormLabel,
  useToast,
  VStack,
} from "@chakra-ui/react";
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
  const [rules, setRules] = useState(null);
  const [currentSlideId, setCurrentSlideId] = useState([]);
  const [pic, setPic] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("78.656891");
  const [latitude, setLatitude] = useState("22.973423");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const mapRef = React.useRef();
  const [address, setAddress] = useState(null);
  const [time, setTime] = useState("");
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
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
  const handleChange4 = (event) => {
    setEntryFee(event.target.value);
  };
  const handleChange5 = (event) => {
    setPrizeMoney(event.target.value);
  };
  const handleChange6 = (event) => {
    setRules(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
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
      data.append("upload_preset", "Tournamax");
      data.append("cloud_name", "dd3c4j1sm");
      fetch("https://api.cloudinary.com/v1_1/dd3c4j1sm/image/upload", {
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
  const handleRename = async () => {
    try {
      const { data } = await axiosInstance.put(`/edit/rename`, {
        chatId: currentSlideId,
        chatName: pic,
      });

      console.log(data._id);
    } catch (error) {
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
  useEffect(() => {
    if (pins && pins.length) {
      console.log(pins);
      setValue(pins[0].tournamentName);
      setOrganizerName(pins[0].organizerName);
      setNoOfTeam(pins[0].noOfTeam);
      setAddress(pins[0].address);
      setEntryFee(pins[0].entryFee);
      setPrizeMoney(pins[0].prizeMoney);
      setRules(pins[0].rules);
      setCurrentSlideId(pins[0]._id);
    }
  }, [pins]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axiosInstance.get(
          `/edittournament/${props.location.state.props}`
        );
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [props]);
  const handleRenameGroupLink = async () => {
    try {
      const { data } = await axiosInstance.put(`/edit/renamegroup`, {
        chatId: currentSlideId,
        chatName: currentSlideId,
      });

      console.log(data._id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRenameTournament = async () => {
    try {
      const { data } = await axiosInstance.put(`/edit/renametournament`, {
        chatId: props.location.state.props,
        chatName: value,
        nameUser: organizerName,
        noOfTeam: noOfTeam,
        address: address,
      });

      console.log(data._id);
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
          <div class="input">
            <label class="input-label">Poster Image</label>
          </div>
          <div class="input">
            <Input
              type={"file"}
              p={"1.5"}
              bg={"gray.50"}
              accept="image/*"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
            <Button
              width={"40%"}
              colorScheme="blue"
              onClick={handleRename}
              isLoading={loading}
            >
              Upload Poster
            </Button>
          </div>
          <div class="input">
            <FormControl id="pic">
              <VStack spacing="1rem">
                <Button
                  width={"40%"}
                  colorScheme="blue"
                  onClick={() => history.push("/image")}
                >
                  Photo Template
                </Button>
              </VStack>
            </FormControl>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              min="1"
              max="11"
              value={entryFee}
              onChange={handleChange4}
            />
            <label class="input-label">Entry fee</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              value={prizeMoney}
              onChange={handleChange5}
            />
            <label class="input-label">Prize Money</label>
          </div>
          <div class="input">
            <input
              type="number"
              class="input-field"
              required
              value={rules}
              onChange={handleChange6}
            />
            <label class="input-label">Rules</label>
          </div>
          <div class="input">
            <div class="edit-button">
              <Button width={"10%"} onClick={onEditOpen}>
                Edit
              </Button>
            </div>
            <label class="input-label">Group Link</label>
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
};
export default Edit;

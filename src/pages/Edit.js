import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = (props) => {
  const [Name1, setName1] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [Name2, setName2] = useState(null);
  const [Name3, setName3] = useState(null);
  const [Name4, setName4] = useState(null);
  const [value, setValue] = useState("");
  const [pins, setPins] = useState([]);
  const { user } = ChatState();
  const { details, setDetails } = ChatState();
  const history = useHistory();
  const [tournamentName, setTournamentName] = useState(null);
  const [organizerName, setOrganizerName] = useState(null);
  const [noOfTeam, setNoOfTeam] = useState(null);
  const [entryFee, setEntryFee] = useState(null);
  const [prizeMoney, setPrizeMoney] = useState(null);
  const [rules, setRules] = useState(null);
  const [currentSlideId, setCurrentSlideId] = useState([]);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("78.656891");
  const [latitude, setLatitude] = useState("22.973423");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const mapRef = React.useRef();
  const [address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("");
  const handleClose = () => setShow(false);
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
      toast.warn("Please select an Image.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
      toast.warn("Please select an Image.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
      toast.warn("Please select an Image.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    if (pins && pins.length) {
      const posterInfo = localStorage.setItem(
        "posterdetails",
        JSON.stringify(pins[0])
      );

      console.log(details);
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
          <div className="input">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
            <button
              style={{ width: "40%" }}
              onClick={handleRename}
              disabled={loading}>
              {loading ? "Uploading..." : "Upload Poster"}
            </button>
          </div>
          <div className="input">
            <div id="pic">
              <button
                style={{ width: "40%" }}
                onClick={() => history.push("/image")}>
                Photo Template
              </button>
            </div>
          </div>

          <div class="input">
            <input
              type="text"
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
              type="text"
              class="input-field"
              required
              value={prizeMoney}
              onChange={handleChange5}
            />
            <label class="input-label">Prize Money</label>
          </div>
          <div class="input">
            <input
              type="text"
              class="input-field"
              required
              value={rules}
              onChange={handleChange6}
            />
            <label class="input-label">Rules</label>
          </div>
          <div class="input">
            <div class="edit-button">
              <Button
                width={"10%"}
                onClick={() => {
                  setShow(true);
                }}>
                Edit
              </Button>
            </div>
            <label class="input-label">Group Link</label>
          </div>
          <div class="action">
            <button
              class="action-button"
              type="submit"
              onClick={handleRenameTournament}>
              Done
            </button>
          </div>
        </form>
        <div class="card-info"></div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Link</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ display: "flex" }}>
              <select className="form-select">
                <option value="">Select option</option>
                <option value="discord">Discord</option>
                <option value="telegram">Telegram</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Link"
                style={{ marginBottom: "3px", marginLeft: "10px" }}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleRenameGroupLink}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <ToastContainer />
    </div>
  );
};
export default Edit;

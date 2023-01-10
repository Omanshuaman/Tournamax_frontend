import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import axios from "axios";

function FootballOrganize() {
  const [tournamentname, setTournamentName] = useState(null);
  const [title, setTitle] = useState(null);
  const [pins, setPins] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: tournamentname,
      title: title,
      desc: "hey stupid",
      rating: 1,
      lat: -43.39573,
      long: -61.79629,
    };

    try {
      const res = await axios.post("/api/pins", newPin);
      setPins([...pins, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
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
  );
}

export default FootballOrganize;

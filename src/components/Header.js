import { Image } from "@chakra-ui/react";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

function Header({ placeholder }) {
  // STATE FOR REACT
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); //need to fix to tomorrow's date
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    // <header
    //   className="sticky top-0 z-50 grid grid-cols-3 bg-white
    // shadow-md p-5 md:px-10"
    // >
    //   <div className="relative my-auto flex h-10 cursor-pointer items-center">
    //     <Image
    //       src="https://i.postimg.cc/ydyhjmC0/185785168-d82eb824-a402-4df3-912d-8787f46ba048.png"
    //       boxSize="150px"
    //       objectFit="contain"
    //       objectPosition="left"
    //     />
    //   </div>

    //   {/* Right */}
    //   <div className="flex items-center space-x-4 justify-end text-gray-500">
    //     <p className="hidden md:inline cursor-pointer">Become a host</p>
    //     <GlobeAltIcon className="h-6" />
    //     <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
    //       <MenuIcon className="h-6" />
    //       <UserCircleIcon className="h-6" />
    //     </div>
    //   </div>
    // </header>

    <div class="bg-white">
      <div class="border py-3 px-6">
        <div class="flex justify-between">
          <div class="flex items-center cursor-pointer">
            <Image
              src="https://i.postimg.cc/ydyhjmC0/185785168-d82eb824-a402-4df3-912d-8787f46ba048.png"
              boxSize="20px"
              objectFit="contain"
              objectPosition="left"
            />
          </div>

          <div class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
            <span class="text-sm font-medium">Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;

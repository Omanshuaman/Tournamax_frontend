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
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import Homepage from "../pages/HomePage";
import ProfileModal from "../components/miscellaneous/ProfileModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
function Header({ placeholder }) {
  const myStorage = window.localStorage;

  const { user, setUser } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    setUser(null);
    myStorage.removeItem("userInfo");
  };
  return (
    <>
      <div class="header">
        <div class="header-right">
          <ul class="">
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
                <button
                  type="button"
                  onClick={onOpen}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={onOpen}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
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
          </ul>
        </div>
      </div>
    </>
  );
}
export default Header;

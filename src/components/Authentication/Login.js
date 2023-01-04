import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Center,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = ({ setonClick1 }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUser } = ChatState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill in all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosInstance.post(
        "/user/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "Login Successful.",
        // description: 'You have successfully logged in.',
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      const userInfo = localStorage.setItem("userInfo", JSON.stringify(data));

      setUser(userInfo);

      setLoading(false);
      setonClick1(false);

      document.location.reload();
    } catch (error) {
      toast({
        title: "Login Failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const google = async () => {
    //const popup = window.open("http://localhost:5000/auth/google", "_self");
    const popup = window.open(
      "https://tournamaxsports.com/api/auth/google",
      "_blank",
      "height=400,width=450"
    );
    if (popup) {
      popup.onload = async function () {
        // your code here will run once the popup window has finished loading
        try {
          const response = await fetch(
            "https://tournamaxsports.com/api/auth/login/success",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            }
          );
          const user = await response.json();
          localStorage.setItem("userInfo", JSON.stringify(user.user));
          setUser(user);
          console.log(user);
        } catch (error) {
          console.log("Failed to get user information", error);
        }
        popup.close();
      };
    }
  };
  // const google = async () => {
  //   //const popup = window.open("http://localhost:5000/auth/google", "_self");
  //   const popup = window.open(
  //     "https://tournamaxsports.com/auth/google",
  //     "_blank",
  //     "height=400,width=450"
  //   );
  //   if (popup) {
  //     popup.onload = async function () {
  //       // your code here will run once the popup window has finished loading
  //       try {
  //         const response = await fetch(
  //           "https://tournamaxsports.com/auth/login/success",
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Accept: "application/json",
  //             },
  //             credentials: "include",
  //           }
  //         );
  //         const user = await response.json();
  //         localStorage.setItem("userInfo", JSON.stringify(user.user));
  //         setUser(user);
  //         console.log(user);
  //       } catch (error) {
  //         console.log("Failed to get user information", error);
  //       }
  //       popup.close();
  //     };
  //   }
  // };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter your email..."
          bg={"gray.50"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password..."
            value={password}
            bg={"gray.50"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button height={"1.75rem"} size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width={"100%"}
        colorScheme="blue"
        onClick={submitHandler}
        style={{ marginTop: "1rem" }}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        w={"full"}
        maxW={"md"}
        colorScheme="blue"
        style={{ marginTop: "1rem" }}
        leftIcon={<FcGoogle />}
        onClick={google}
      >
        <Center>
          <h1>Sign in with Google</h1>
        </Center>
      </Button>
    </VStack>
  );
};
export default Login;

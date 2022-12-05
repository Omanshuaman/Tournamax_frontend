import React, { useEffect } from "react";

import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const HomePage = ({ setonClick }) => {
  const history = useHistory();

  return (
    <Container maxW="xl" centerContent>
      <Box bg={"blue.100"} borderRadius="lg" width={"100%"} p={10}>
        <Tabs variant="soft-rounded" colorScheme="green" defaultIndex={0}>
          <TabList mb={"1rem"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login setonClick1={setonClick} />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;

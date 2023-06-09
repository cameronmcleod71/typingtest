import React, { useEffect } from "react";
import {
  Heading,
  Spacer,
  Box,
  Flex,
  Container,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  useRadio,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import CSRFToken from "./CSRFToken";
import ResultsPage from "../pages/ResultsPage";
import PastResults from "../pages/PastResults";
import { signOut } from "../utils/auth";
import Crate from "./Crate";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.user.username);

  // useEffect();

  return (
    <Crate
      borderingCrates={["Bottom"]}
      h={{ base: "70px", md: "70px", lg: "80px" }}
      width="auto"
      display="flex"
      alignItems="center"
      minWidth="auto"
    >
      <CSRFToken />
      <Grid templateColumns="repeat(3, 1fr)" width="100%" gap={0}>
        <GridItem colSpan="1" marginX="20px" width="auto">
          <Flex justifyContent="flex-start" align="center" gap="30px">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                // bg="#2B3A55"
                // color="#abb2bf"
                size={{ base: "sm", md: "sm", lg: "md" }}
                colorScheme="red"
              >
                Menu
              </MenuButton>
              <MenuList bg="customForeground">
                <Link to="/">
                  <MenuItem bg="customForeground" _hover={{bg: "gray.700"}}> Take a test </MenuItem>
                </Link>
                <Link to="/leaderboard">
                  <MenuItem bg="customForeground" _hover={{bg: "gray.700"}}> Leaderboard </MenuItem>
                </Link>
                <MenuItem bg="customForeground" _hover={{bg: "gray.700"}}> TBD </MenuItem>
              </MenuList>
            </Menu>
            {/* <Link to="/leaderboard">
              <Button color="#abb2bf" bg="#2B3A55" size={{base: "sm", md: "sm", lg: "md"}}>
                {" "}
                Leaderboard{" "}
              </Button>
            </Link> */}
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem colSpan="1" width="auto">
          <Flex justifyContent="center">
            <Box>
              <Link to="/">
                <Heading
                  as="h1"
                  textAlign="center"
                  color="#abb2bf"
                  fontSize={{ base: "2xl", md: "3xl" }}
                >
                  typer.io
                </Heading>
              </Link>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan="1" marginX="20px" width="auto">
          <Flex justify="flex-end" align="center">
            <Spacer />
            <Box>
              {isAuthenticated ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="gray"
                    variant="outline"
                    borderWidth="2px"
                    size={{ base: "sm", md: "sm", lg: "md" }}
                  >
                    {username}
                  </MenuButton>
                  <MenuList bg="customForeground">
                    <Link to="/myaccount">
                      <MenuItem bg="customForeground" _hover={{bg: "gray.700"}}>My Account</MenuItem>
                    </Link>
                    <Link to="/pastresults">
                      <MenuItem bg="customForeground" _hover={{bg: "gray.700"}}>Results</MenuItem>
                    </Link>
                    {/* <CSRFToken /> */}
                    <MenuItem bg="customForeground" _hover={{bg: "gray.700"}} onClick={() => signOut()}>Sign Out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link to="/login">
                  <Button
                    textAlign="center"
                    // bg="#2B3A55"
                    // color="#abb2bf"
                    variant="outline"
                    borderWidth="2px"
                    colorScheme="gray"
                    size={{ base: "sm", md: "sm", lg: "md" }}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      {/* <Flex justifyContent="space-between" p="15px">
                <Box>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='#2B3A55' color="#abb2bf">
                            Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem> Special Chararacter </MenuItem>
                            <Link to="/programmer">
                                <MenuItem> Programmer </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                    <Link to="/leaderboard">
                        <Button color="#abb2bf" bg='#2B3A55'> Leaderboard </Button>
                    </Link>
                </Box>
                <Spacer width="100px" />
                <Box>
                    <Link to="/">
                        <Heading as="h1" textAlign="center" color="#abb2bf">typer.io</Heading>
                    </Link>
                </Box>
                <Spacer width="100px" />
                <Box>
                    { 
                    isAuthenticated ?

                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='#2B3A55' color="#abb2bf">
                                { username }
                            </MenuButton>
                            <MenuList>
                                <Link to="/myaccount">
                                    <MenuItem>My Account</MenuItem>
                                </Link>
                                <Link to="/pastresults">
                                    <MenuItem>Results</MenuItem>
                                </Link>
                                <CSRFToken />
                                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    :
                        <Link to="/login">
                            <Text textAlign="center" as={Button} bg='#2B3A55' color="#abb2bf">Sign In</Text>
                        </Link>
                    }
                </Box>
            </Flex> */}
    </Crate>
  );
}

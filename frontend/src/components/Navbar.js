import React, { useEffect } from 'react'
import { Heading, Spacer, Box, Flex, Container, Text, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Button, useRadio, Grid, GridItem } from "@chakra-ui/react"
import { Form, Link, Navigate, useNavigate } from "react-router-dom"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import CSRFToken from './CSRFToken'
import ResultsPage from '../pages/ResultsPage'
import PastResults from '../pages/PastResults'
import { signOut } from '../utils/auth'



export default function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const username = useSelector((state) => state.user.username);


    return (
        <Box borderBottom="1px" borderColor="#0B1121">
            <Box>
                <Grid templateColumns="repeat(3, 1fr)">
                    <GridItem colSpan="1" display="flex" justifyContent="flex-start" alignItems="center" m="10px" gap="30px" marginX="20px">
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
                        <Link>
                            <Button color="#abb2bf" bg='#2B3A55'>Leaderboard </Button>
                        </Link>
                    </GridItem>
                    <GridItem colSpan="1" m="10px" marginY="20px">
                        <Box>
                            <Link to="/">
                                <Heading as="h1" textAlign="center" color="#abb2bf">typer.io</Heading>
                            </Link>
                        </Box>
                    </GridItem>
                    <GridItem colSpan="1" display="flex" justifyContent="flex-end" alignItems="center" m="10px" marginX="20px">
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
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}
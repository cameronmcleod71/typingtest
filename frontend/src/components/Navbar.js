import React from 'react'
import { Heading, Spacer, Box, Flex, Container, Text, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Button, useRadio } from "@chakra-ui/react"
import { Form, Link, Navigate, useNavigate } from "react-router-dom"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import CSRFToken from './CSRFToken'
import ResultsPage from '../pages/ResultsPage'
import PastResults from '../pages/PastResults'


export default function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();


    const signOut = () => {
        //sign out here
        fetch('/api/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            body: JSON.stringify({'withCredentials': true}),
        })
        .then((response) => {
            console.log(response);
            response.json()})
        .then((data) => {
            console.log(data);
            window.location.reload();
        })
        .catch((err) =>
            console.log(err)
        );


    }

    return (
        <Container>
            <Flex as="nav" p="30px" bg="grey.200" justifyContent="space-between" alignItems="center">
                <Menu flex={1}>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Menu
                    </MenuButton>
                    <MenuList>
                        <MenuItem> Special Chararacter Test</MenuItem>
                        <MenuItem> Leaderboard </MenuItem>
                    </MenuList>
                </Menu>
                <Spacer />
                <Box flex={1}>
                    {/* <Heading as="a" onClick={() => <Navigate to="/" />} textAlign="center">
                        Typer
                    </Heading> */}
                    <Link to="/">
                        <Heading as="h1" textAlign="center">Typer</Heading>
                    </Link>
                </Box>
                <Spacer />
                <Box flex={1}>
                    { 
                    isAuthenticated ?

                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                { username }
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Account</MenuItem>
                                <Link to="/pastresults">
                                    <MenuItem>Results</MenuItem>
                                </Link>
                                <CSRFToken />
                                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    :
                        <Link to="/login">
                            <Text textAlign="center" as={Button}>Sign In</Text>
                        </Link>
                    }
                </Box>
            </Flex>
        </Container>
    )
}